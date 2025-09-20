import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-view-image',
  imports: [
    MatDialogModule,
  ],
  templateUrl: './view-image.html',
  styleUrl: './view-image.scss',
  standalone: true,
})
export class ViewImage {
  @Input() url!: string;
  @Output() close = new EventEmitter<void>();
}
