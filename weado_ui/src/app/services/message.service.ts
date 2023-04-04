import { Injectable} from '@angular/core';
import { MessageComponent } from '../components/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {}
  message(msg:string){
    alert(msg);
  }
}
