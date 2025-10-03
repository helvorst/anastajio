import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-contacts',
    imports: [
       CommonModule,
      NgOptimizedImage
    ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  standalone: true,
})
export class Contacts {

}
