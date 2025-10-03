import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {S3Service} from "../services/s3.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BehaviorSubject, shareReplay, tap} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {ViewImage} from "../dialogs/view-image/view-image";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Contactdialog} from "../dialogs/contactdialog/contactdialog";

const DEFAIULT_SHOWN_IMAGES_INDEX=9;
const DEFAIULT_SHOWN_IMAGES_INDEX_MOBILE=5;
const DEFAIULT_LOAD_MORE_SIZE=12;

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
  private readonly destroyRef = inject(DestroyRef);
  private readonly s3Service = inject(S3Service);
  private readonly cdr = inject(ChangeDetectorRef);
  private overlay = inject(Overlay);
  private overlayRef?: OverlayRef;
  readonly loading$ = new BehaviorSubject<boolean>(true);

  readonly mapFolderKeyToShownImageIndex = new Map<string, number>();

  readonly isMobile = this.isMobileDevice();

  readonly DEFAIULT_SHOWN_IMAGES_INDEX = this.isMobile ? DEFAIULT_SHOWN_IMAGES_INDEX_MOBILE : DEFAIULT_SHOWN_IMAGES_INDEX;

  readonly folderMetas$ = this.s3Service.listFoldersWithMetadata()
    .pipe(
      tap(() => this.loading$.next(false)),
      takeUntilDestroyed(this.destroyRef),
      shareReplay({refCount: true, bufferSize: 1})
    );

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
}
