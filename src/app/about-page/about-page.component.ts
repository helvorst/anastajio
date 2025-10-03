import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {Contactdialog} from "../dialogs/contactdialog/contactdialog";

@Component({
  selector: 'app-about-page',
  standalone: true,
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  private overlay = inject(Overlay);
  private overlayRef?: OverlayRef;

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
