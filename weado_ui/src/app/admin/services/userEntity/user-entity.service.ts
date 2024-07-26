import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from '../../../../environments/environment';
import { User } from '../../../Classes-Interfaces/user';
import { StorageService } from '../storage.service';


export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
  timeout: 3000, // request timeout
}

@Injectable({
  providedIn: 'root'
})
export class UserEntityService extends EntityCollectionServiceBase<User> {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient, private storage: StorageService
  ) {
    super('User', serviceElementsFactory);
  }
}
