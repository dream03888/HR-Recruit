import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';

import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),

    // ⭐ เพิ่ม provider ของ SocketIO แบบนี้
    importProvidersFrom(
      SocketIoModule.forRoot({
        url: environment.API_URL,
        options: { autoConnect: true }
      })
    )
  ]
};
