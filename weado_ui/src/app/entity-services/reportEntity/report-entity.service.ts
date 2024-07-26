import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { StorageService } from '../../admin/services/storage.service';
import { Report } from "../../Classes-Interfaces/report";

@Injectable({
  providedIn: 'root'
})

export class ReportEntityService extends EntityCollectionServiceBase<Report> {
  private id!: string;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient, private storage: StorageService
  ) {
    super('Report', serviceElementsFactory);
  }
}
