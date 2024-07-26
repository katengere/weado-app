import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from "../../../environments/environment";
import { Project } from '../../Classes-Interfaces/project';
import { StorageService } from '../../admin/services/storage.service';

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
  timeout: 3000, // request timeout
}

@Injectable({
  providedIn: 'root'
})
export class ProjectEntityService extends EntityCollectionServiceBase<Project> {
  private id!: string;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient, private storage: StorageService
  ) {
    super('Project', serviceElementsFactory);
  }
}
