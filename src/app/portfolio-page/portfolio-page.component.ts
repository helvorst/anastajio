import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {S3Service} from "../services/s3.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BehaviorSubject, map, shareReplay, switchMap, tap} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {ViewImage} from "../dialogs/view-image/view-image";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Contactdialog} from "../dialogs/contactdialog/contactdialog";

const DEFAIULT_SHOWN_IMAGES_INDEX=9;
const DEFAIULT_SHOWN_IMAGES_INDEX_MOBILE=5;
const DEFAIULT_LOAD_MORE_SIZE=12;
const DELIMITER=' ₓ ';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
   CommonModule, MatButtonModule, MatProgressBarModule
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {
  DELIMITER = DELIMITER;
  private readonly destroyRef = inject(DestroyRef);
  private readonly s3Service = inject(S3Service);
  private readonly cdr = inject(ChangeDetectorRef);
  private overlay = inject(Overlay);
  private overlayRef?: OverlayRef;
  readonly loading$ = new BehaviorSubject<boolean>(true);

  readonly mapFolderKeyToShownImageIndex = new Map<string, number>();

  readonly isMobile = this.isMobileDevice();

  readonly DEFAIULT_SHOWN_IMAGES_INDEX = this.isMobile ? DEFAIULT_SHOWN_IMAGES_INDEX_MOBILE : DEFAIULT_SHOWN_IMAGES_INDEX;

  private readonly foldersMetasOriginal$ = this.s3Service.listFoldersWithMetadata();

  readonly tagFilter$ = new BehaviorSubject<string>('');

  readonly folderMetas$ = this.foldersMetasOriginal$
    .pipe(
      switchMap(folders => {
        return this.tagFilter$.pipe(
          map(tagFilter => {
            if(!tagFilter) return folders;

            return folders.filter(folder => folder.metadata.keywords.includes(tagFilter))
          }),
        )
      }),
      tap(() => this.loading$.next(false)),
      takeUntilDestroyed(this.destroyRef),
      shareReplay({refCount: true, bufferSize: 1})
    );

  readonly tags$ = this.foldersMetasOriginal$.pipe(
    map(metas => metas.map(meta => meta.metadata.keywords).flat()),
    map(tags => {
      const m = new Map<string, number>();
      for (const tag of tags) {
        const tagLowercase = tag.toLowerCase();
        let existing = m.get(tagLowercase) || 0;
        existing++;
        m.set(`${tagLowercase}`, existing);
      }
      return Array.from(m.entries()).sort((a, b) => b[1] - a[1]).map(e => `${e[0]}${DELIMITER}${e[1]}`).slice(0, 10);
    }),
    takeUntilDestroyed(this.destroyRef),
    shareReplay({refCount: true, bufferSize: 1})
  )

  showMore(folderPath: string) {
    const current = this.mapFolderKeyToShownImageIndex.get(folderPath) || DEFAIULT_SHOWN_IMAGES_INDEX;
    const newIndex = current + DEFAIULT_LOAD_MORE_SIZE;
    this.mapFolderKeyToShownImageIndex.set(folderPath, newIndex);
    this.cdr.markForCheck();
  }

  openImage(url: string) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      positionStrategy: this.overlay.position().global().top('0').left('0'),
      width: '100vw',
      height: '100vh'
    });

    const portal = new ComponentPortal(ViewImage);
    const compRef = this.overlayRef.attach(portal);
    compRef.instance.url = url;
    compRef.instance.close.subscribe(() => this.overlayRef?.dispose());
  }

  isMobileDevice(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  openContacts() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      positionStrategy: this.overlay.position().global().top('0').left('0'),
      width: '100vw',
      height: '100vh'
    });

    const portal = new ComponentPortal(Contactdialog);
    const compRef = this.overlayRef.attach(portal);
    compRef.instance.close.subscribe(() => this.overlayRef?.dispose());
  }

  setFilterKeyword(tag: string) {
    const tagLowercase = tag.split(DELIMITER)[0];
    const next = this.tagFilter$.getValue() === tagLowercase ? '' : tagLowercase;
    this.tagFilter$.next(next);
  }
}
