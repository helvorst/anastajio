import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {S3Service} from "../services/s3.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {shareReplay} from "rxjs";
import {MatButtonModule} from "@angular/material/button";

const DEFAIULT_SHOWN_IMAGES_INDEX=5;
const DEFAIULT_LOAD_MORE_SIZE=12;

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
   CommonModule, MatButtonModule,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly s3Service = inject(S3Service);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly mapFolderKeyToShownImageIndex = new Map<string, number>();
  readonly DEFAIULT_SHOWN_IMAGES_INDEX =DEFAIULT_SHOWN_IMAGES_INDEX

  readonly folderMetas$ = this.s3Service.listFoldersWithMetadata()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      shareReplay({refCount: true, bufferSize: 1})
    );

  showMore(folderPath: string) {
    const current = this.mapFolderKeyToShownImageIndex.get(folderPath) || DEFAIULT_SHOWN_IMAGES_INDEX;
    const newIndex = current + DEFAIULT_LOAD_MORE_SIZE;
    this.mapFolderKeyToShownImageIndex.set(folderPath, newIndex);
    this.cdr.markForCheck();
  }
}
