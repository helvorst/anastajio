import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    NgOptimizedImage
  ],
  standalone: true,
})
export class AppComponent {
}
