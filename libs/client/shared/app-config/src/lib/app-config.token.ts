import { InjectionToken, ValueProvider } from '@angular/core';

import { AppConfig } from './app.config';

export const APP_CONFIG = new InjectionToken<AppConfig>('aymme.config');
export const config: AppConfig = {} as AppConfig;

export const getAppConfigProvider = (defaults: AppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: {
    ...defaults,
    ...config,
  },
});
