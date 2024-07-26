import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { StorageService } from '../../admin/services/storage.service';
import { Image } from "../../Classes-Interfaces/image";

@Injectable({
  providedIn: 'root'
})

export class ImageEntityService extends EntityCollectionServiceBase<Image> {
  private id!: string;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient, private storage: StorageService
  ) {
    super('Image', serviceElementsFactory);
  }
}
