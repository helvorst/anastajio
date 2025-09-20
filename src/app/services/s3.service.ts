import {Injectable} from "@angular/core";
import { list, downloadData, getUrl } from 'aws-amplify/storage';
import {catchError, filter, forkJoin, from, map, Observable, of, switchMap, throwError} from "rxjs";

const S3_FILE_PATH = 'photos/';

export interface FolderMetadata {
  description: string;
  createdAt: string,
  camera: string;
  keywords: string[];
}

export interface FolderWithMetadata {
  path: string; // Subfolder path
  metadata: FolderMetadata; // From metadata.json, see example at anastajio-app/src/assets/app/metadata.json
  images: ImageItem[];
}

export interface ImageItem {
  path: string;    // S3 key/path
  url: string;     // signed URL for display
  lastModified?: Date;
  size?: number;
}

@Injectable({providedIn: 'root'})
export class S3Service {
  private listFolders() {
    return from(
      list({ path: S3_FILE_PATH})).pipe(
      map(res => {
        const sub = new Set<string>();
        for (const item of res.items) {
          const remainder = item.path.replace(S3_FILE_PATH, '');
          if(remainder) {
            const slash = remainder.indexOf('/');
            if (slash !== -1) sub.add(remainder.slice(0, slash + 1));
          }
        }
        return Array.from(sub);
      }),
      catchError(e => {
        console.error('Failed to find', e);
        return throwError(() => e);
      })
    );
  }

  /** Downloads and parses metadata.json for a single folder */
  private fetchFolderMetadata(folder: string): Observable<FolderMetadata> {
    const metaPath = `${S3_FILE_PATH}${folder}metadata.json`;

    return from(downloadData({ path: metaPath}).result).pipe(
      // downloadData returns { body: ReadableStream | Blob | ... }
      switchMap(({ body }: any) => {
        // Handle both Blob (browser) and stream-like bodies
        if (body?.text) {
          return from(body.text());
        }
        if (body?.toString) {
          return of(body.toString());
        }

        // Fallback: attempt arrayBuffer -> string
        // if (body?.arrayBuffer) {
        //   return from(body.arrayBuffer()).pipe(
        //     map((ab: ArrayBuffer) => new TextDecoder('utf-8').decode(new Uint8Array(ab)))
        //   );
        // }
        // Unexpected body type
        return throwError(() => new Error('Unsupported body type for metadata.json'));
      }),
      map((text: string) => JSON.parse(text) as FolderMetadata),
      catchError(err => {
        console.warn(`No/invalid metadata for ${folder}:`, err?.message || err);
        return of(null);
      }),
      filter(Boolean)
    );
  }

  private fetchFolderImages(folder: string): Observable<ImageItem[]> {
    const folderPath = `${S3_FILE_PATH}${folder}`;

    return from(list({ path: folderPath })).pipe(
      map(res => {
        // Keep only files directly inside this folder (no deeper '/')
        const files = res.items.filter(i => {
          const remainder = i.path.replace(folderPath, '');
          return remainder.length > 0 && !remainder.includes('/'); // direct child
        });

        // Filter to images and sort by lastModified desc
        const images = files
          .filter(i => /\.(jpe?g|png|webp|gif|avif|bmp|heic)$/i.test(i.path));
          // .sort((a, b) => {
          //   const ta = a.lastModified ? new Date(a.lastModified).getTime() : 0;
          //   const tb = b.lastModified ? new Date(b.lastModified).getTime() : 0;
          //   return tb - ta;
          // });

        return images;
      }),
      // Get signed URLs for display
      switchMap(images => {
        if (!images.length) return of([] as ImageItem[]);

        return forkJoin(
          images.map(img =>
            from(getUrl({ path: img.path, options: { expiresIn: 3600 } })).pipe(
              map(res => ({
                path: img.path,
                url: res.url.toString(),
                lastModified: img.lastModified ? new Date(img.lastModified) : undefined,
                size: img.size
              } satisfies ImageItem)),
              catchError(() =>
                // If URL signing fails for one image, skip it
                of(null as unknown as ImageItem)
              )
            )
          )
        ).pipe(map(arr => arr.filter(Boolean)));
      }),
      catchError(err => {
        console.warn(`Failed to list images for ${folder}:`, err?.message || err);
        return of([]); // tolerate per-folder failure
      })
    );
  }

  /** List subfolders and attach their parsed metadata.json and image urls */
  listFoldersWithMetadata(): Observable<FolderWithMetadata[]> {
    return this.listFolders().pipe(
      switchMap(folders => {
        if (!folders.length) return of([]);

        // For each folder, load metadata and images in parallel
        const perFolder$ = folders.map(folder =>
          forkJoin({
            metadata: this.fetchFolderMetadata(folder),
            images: this.fetchFolderImages(folder)
          }).pipe(
            map(({metadata, images}) => {
              return {path: folder, metadata, images} as FolderWithMetadata;
            }),
            catchError(err => {
              console.warn(`Failed to assemble folder ${folder}:`, err?.message || err);
              return of(null);
            })
          )
        );

        return forkJoin(perFolder$);
      }),
      map(results => results.filter((x): x is FolderWithMetadata => !!x))
    );
  }

}
