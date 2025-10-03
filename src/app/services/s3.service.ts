import {Injectable} from "@angular/core";
import { list, downloadData, getUrl } from 'aws-amplify/storage';
import {catchError, filter, forkJoin, from, map, Observable, of, switchMap, throwError} from "rxjs";

const S3_FILE_PATH = 'photos/';

export interface FolderMetadata {
  description: string;
  createdAt: string, // Display date
  camera: string;
  keywords: string[];
  dateForSorting: string;
}

export interface FolderWithMetadata {
  metadata: FolderMetadata; // From metadata.json, see example at anastajio-app/src/assets/app/metadata.json
  images: ImageItem[];
  path: string;
}

export interface ImageItem {
  path: string;    // S3 key/path
  url: string;     // signed URL for display
}

export interface ListFilesFolderResult {
  key: string;
  metadataPath: string;
  imagePaths: string[];
}

@Injectable({providedIn: 'root'})
export class S3Service {
  private getFoldersContent(): Observable<ListFilesFolderResult[]> {
    return from(
      list({ path: S3_FILE_PATH})).pipe(
      map(res => {
        const metadataPaths = res.items.filter(i => i.path.endsWith('metadata.json'));
        const map = new Map<string, ListFilesFolderResult>();
        for (const metadataPath of metadataPaths) {
          const key = metadataPath.path.substring(0, metadataPath.path.lastIndexOf('/'));
          map.set(key, {
            key,
            metadataPath: metadataPath.path,
            imagePaths: []
          });
        }
        for (const item of res.items) {
          const key = item.path.substring(0, item.path.lastIndexOf('/'));
          const isImage = /\.(jpe?g|png|webp|gif|avif|bmp|heic)$/i.test(item.path);
          if (isImage) {
            const existing = map.get(key);
            if(!existing) {
              console.warn(`Unexpected image ${item.path} in ${key}`);
              continue;
            } else {
              existing.imagePaths.push(item.path);
            }
          }
        }

        return Array.from(map.values());
      }),
      catchError(e => {
        console.error('Failed to find', e);
        return throwError(() => e);
      })
    );
  }

  /** Downloads and parses metadata.json for a single folder */
  private fetchFolderMetadata(metaPath: string): Observable<FolderMetadata|null> {
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
        console.warn(`No/invalid metadata for ${metaPath}:`, err?.message || err);
        return of(null);
      }),
    );
  }

  private fetchFolderImagesSignedUrls(imagePaths: string[]): Observable<ImageItem[]> {
    if (!imagePaths.length) return of([]);

    return forkJoin(
          imagePaths.map(imgPath =>
            from(getUrl({ path: imgPath, options: { expiresIn: 3600 } })).pipe(
              map(res => ({
                path: imgPath,
                url: res.url.toString(),
              } satisfies ImageItem)),
              catchError(() =>
                // If URL signing fails for one image, skip it
                of(null as unknown as ImageItem)
              )
            )
          )
        ).pipe(
          catchError(err => {
            console.warn(`Failed to list images`, err?.message || err);
            return of([]); // tolerate per-folder failure
          })
    );
  }

  /** List subfolders and attach their parsed metadata.json and image urls */
  listFoldersWithMetadata(): Observable<FolderWithMetadata[]> {
    return this.getFoldersContent().pipe(
      switchMap(foldersContent => {
        if (!foldersContent.length) return of([]);

        // For each folder, load metadata and images in parallel
        const perFolder$ = foldersContent.map(foldersContent =>
          forkJoin({
            metadata: this.fetchFolderMetadata(foldersContent.metadataPath),
            images: this.fetchFolderImagesSignedUrls(foldersContent.imagePaths)
          }).pipe(
            map(({metadata, images}) => {
              return {metadata, images, path: foldersContent.key} as FolderWithMetadata;
            }),
            catchError(err => {
              console.warn(`Failed to assemble folder`, err?.message || err);
              return of(null);
            })
          )
        );

        return forkJoin(perFolder$);
      }),
      map(results => results.filter((x): x is FolderWithMetadata => !!x && !!x.metadata && x.images?.length > 0)
          .sort((a, b) => (b.metadata.dateForSorting || '').localeCompare(a.metadata.dateForSorting || '')))
    );
  }

}
