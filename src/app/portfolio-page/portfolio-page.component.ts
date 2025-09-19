import {Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {S3Service} from "../services/s3.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
   CommonModule,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss'
})
export class PortfolioPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly s3Service = inject(S3Service);

  photoUrls = Array.from(Array(26)).map((x, i) => `assets/photos/photo${i+1}.JPG`);

  constructor() {
    this.s3Service.listFolders()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(
      folders => {
        console.log(folders);
      }
    );
  }

}
