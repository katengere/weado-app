import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Message } from '../../Classes-Interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class MessageEntityService extends EntityCollectionServiceBase<Message> {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Message', serviceElementsFactory);
  }
}
