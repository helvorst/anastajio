import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
Amplify.configure(amplifyconfig);
