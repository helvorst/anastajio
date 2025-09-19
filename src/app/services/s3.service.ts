import {Injectable} from "@angular/core";
import { list } from 'aws-amplify/storage';
import {catchError, from, map, throwError} from "rxjs";

const S3_FILE_PATH = 'public/data/files/';

@Injectable({providedIn: 'root'})
export class S3Service {
  listFolders() {
    return from(
      list({ path: S3_FILE_PATH})).pipe(
      // map(res => {
      //   return res;
      //   // const sub = new Set<string>();
      //   // for (const item of res.items) {
      //   //   // const remainder = item.path.replace(S3_FILE_PATH, '');
      //   //   // const slash = remainder.indexOf('/');
      //   //   // if (slash !== -1) sub.add(remainder.slice(0, slash + 1));
      //   // }
      //   // return Array.from(sub);
      // }),
      catchError(e => {
        console.error('Failed to find', e);
        return throwError(() => e);
      })
    );
  }
}
