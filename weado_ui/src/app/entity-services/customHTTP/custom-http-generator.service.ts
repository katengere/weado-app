import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, HttpResourceUrls, Pluralizer } from '@ngrx/data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpGeneratorService extends DefaultHttpUrlGenerator {

  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }
  protected override getResourceUrls(entityName: string): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (entityName === 'User') {
      resourceUrls = {
        collectionResourceUrl: environment.apiUrl + '/weado/users/auth/',
        entityResourceUrl: environment.apiUrl + '/weado/users/auth/'
      }
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    } else if (entityName === 'Project') {
      resourceUrls = {
        collectionResourceUrl: environment.apiUrl + '/weado/projects/',
        entityResourceUrl: environment.apiUrl + '/weado/projects/'
      }
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    } else if (entityName === 'Activity') {
      resourceUrls = {
        collectionResourceUrl: environment.apiUrl + '/weado/projects/activities/',
        entityResourceUrl: environment.apiUrl + '/weado/projects/activities/'
      }
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}
