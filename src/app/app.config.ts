import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSlateUiTheme } from '@slateui/theme';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideSlateUiTheme({
      defaultTheme: 'system',
      storageKey: 'theme',
      strategy: 'class',
      enableAutoInit: true,
      enableColorScheme: true,
      enableSystem: true,
    }),
  ]
};
