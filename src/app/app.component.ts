import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anastajio';
  photoUrls = Array.from(Array(12)).map((x, i) => `assets/photos/photo${i+1}.JPG`);
}
