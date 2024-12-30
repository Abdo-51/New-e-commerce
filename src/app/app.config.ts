import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes , withHashLocation() , withViewTransitions() , withInMemoryScrolling({
      scrollPositionRestoration: 'top'
    })),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    provideToastr()
    
  ],
};
