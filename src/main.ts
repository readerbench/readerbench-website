import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Location } from '@angular/common';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const __stripTrailingSlash = (Location as any).stripTrailingSlash;
(Location as any).stripTrailingSlash = function _stripTrailingSlash(url: string): string {
  return /[^\/]\/$/.test(url) ? url : __stripTrailingSlash(url);
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
