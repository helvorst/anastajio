import {Component, EventEmitter, Output} from '@angular/core';
import {Contacts} from "../../contacts/contacts";

@Component({
  selector: 'app-contactdialog',
  imports: [
    Contacts,
  ],
  templateUrl: './contactdialog.html',
  styleUrl: './contactdialog.scss',
  standalone: true,
})
export class Contactdialog {
  @Output() close = new EventEmitter<void>();
}
