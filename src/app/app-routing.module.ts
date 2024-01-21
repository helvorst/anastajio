import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutPageComponent} from "./about-page/about-page.component";
import {PortfolioPageComponent} from "./portfolio-page/portfolio-page.component";

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent },
  { path: '', component: PortfolioPageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
