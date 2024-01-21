import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {NgxGridModule} from "@egjs/ngx-grid";

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    NgForOf,
    NgxGridModule,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss'
})
export class PortfolioPageComponent {
  defaultDirection = "end" as const;
  gap = 5;
  align = "stretch" as const;
  column = 3;
  columnSize = 0;
  columnSizeRatio = 0;

  photoUrls = Array.from(Array(26)).map((x, i) => `assets/photos/photo${i+1}.JPG`);

}
