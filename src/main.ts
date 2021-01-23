import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/* OBSERVABLE STORE EXTENSIONS*/
import { ObservableStore } from '@codewithdan/observable-store';
import { ReduxDevToolsExtension } from '@codewithdan/observable-store-extensions';

ObservableStore.globalSettings = {
  trackStateHistory: true,
};

if (environment.production) {
  enableProdMode();
}

ObservableStore.addExtension(new ReduxDevToolsExtension());

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
