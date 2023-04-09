import { Injectable} from '@angular/core';
import { MessageComponent } from '../components/message/message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../Classes-Interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackbar: MatSnackBar
  ) {}
  message(msg:Message, ...bg:string[]){
    this.snackbar.openFromComponent(MessageComponent,{
      data:msg,
      duration: 3000,
      panelClass: [...bg],

    })
  }
}
