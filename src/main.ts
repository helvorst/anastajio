import { Amplify } from 'aws-amplify';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideRouter, Routes, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from '@angular/router';
import { AppComponent } from './app/app.component';
import {AboutPageComponent} from "./app/about-page/about-page.component";
import {PortfolioPageComponent} from "./app/portfolio-page/portfolio-page.component";
import amplifyconfig from './amplifyconfiguration.json';

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'portfolio', component: PortfolioPageComponent },
  { path: '', component: PortfolioPageComponent, pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
    ),
    provideAnimations(),
    provideHttpClient(),
    // If you still have NgModules (e.g., a Material module), bring them in via:
    // importProvidersFrom(CustomMaterialModule)
  ],
}).catch(err => console.error(err));

Amplify.configure(amplifyconfig);
