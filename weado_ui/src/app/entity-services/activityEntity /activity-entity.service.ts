import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { StorageService } from '../../admin/services/storage.service';
import { Activity } from '../../Classes-Interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityEntityService extends EntityCollectionServiceBase<Activity> {
  private id!: string;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient, private storage: StorageService
  ) {
    super('Activity', serviceElementsFactory);
  }
}
