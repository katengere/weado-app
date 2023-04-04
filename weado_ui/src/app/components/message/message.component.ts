import { Component, Input } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'weado-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message: string = '';
constructor(){}
}
