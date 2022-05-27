import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

const request = new XMLHttpRequest();

request.onload = async () => {
  const config = (await import('@aymme/client/shared/app-config')).config;

  console.log({ environment });
  console.log('config.json', request.response);

  if (environment.production) {
    Object.assign(config, JSON.parse(request.response));
  }

  const AppModule = (await import('./app/app.module')).AppModule;

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
};

request.onerror = () => {
  console.error('Error while loading config.json');
};

request.open('GET', './assets/config.json');

request.send();
