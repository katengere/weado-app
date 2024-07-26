import { ApplicationConfig, ENVIRONMENT_INITIALIZER, inject, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DefaultHttpUrlGenerator, HttpUrlGenerator, provideEntityData, withEffects } from '@ngrx/data';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { entityConfig } from './entity-metadata';
import { CustomHttpGeneratorService } from './entity-services/customHTTP/custom-http-generator.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({ 'router': routerReducer }),
    provideEffects(),
    CustomHttpGeneratorService,
    DefaultHttpUrlGenerator,
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue() {
        const httpGeneratorService = inject(HttpUrlGenerator);
        httpGeneratorService.registerHttpResourceUrls({
          ['Project']: {
            collectionResourceUrl: environment.apiUrl + '/projects/',
            entityResourceUrl: environment.apiUrl + '/projects/'
          }
        });
        httpGeneratorService.registerHttpResourceUrls({
          ['Report']: {
            collectionResourceUrl: environment.apiUrl + '/reports/',
            entityResourceUrl: environment.apiUrl + '/reports/'
          }
        });
        httpGeneratorService.registerHttpResourceUrls({
          ['Activity']: {
            collectionResourceUrl: environment.apiUrl + '/activities/',
            entityResourceUrl: environment.apiUrl + '/activities/'
          }
        });
        httpGeneratorService.registerHttpResourceUrls({
          ['User']: {
            collectionResourceUrl: environment.apiUrl + '/users/',
            entityResourceUrl: environment.apiUrl + '/user/'
          }
        });
        httpGeneratorService.registerHttpResourceUrls({
          ['Image']: {
            collectionResourceUrl: environment.apiUrl + '/images/',
            entityResourceUrl: environment.apiUrl + '/images/'
          }
        });
        httpGeneratorService.registerHttpResourceUrls({
          ['Message']: {
            collectionResourceUrl: environment.apiUrl + '/messages/',
            entityResourceUrl: environment.apiUrl + '/messages/'
          }
        });
      },
      multi: true
    },
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
    }),
    provideRouterStore(),
    provideEntityData(entityConfig, withEffects()),
  ]
};

// ProjectDataService,
//   ReportDataService,
//   ActivityDataService,
//   ImageDataService,

// const eDataService = inject(EntityDataService);
// const projectDataService = inject(ProjectDataService);
// const reportDataService = inject(ReportDataService);
// const activityDataService = inject(ActivityDataService);
// const imageDataService = inject(ImageDataService);

// eDataService.registerServices({
//   Project: projectDataService,
//   Report: reportDataService,
//   Activity: activityDataService,
//   Image: imageDataService
// });