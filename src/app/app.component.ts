import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {Contacts} from "./contacts/contacts";
import {ComponentPortal} from "@angular/cdk/portal";
import {ViewImage} from "./dialogs/view-image/view-image";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {Contactdialog} from "./dialogs/contactdialog/contactdialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    Contacts
  ],
  standalone: true,
})
export class AppComponent {
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
