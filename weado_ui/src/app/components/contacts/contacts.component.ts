import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Message } from '../../Classes-Interfaces/message';
import { AlertService } from '../../entity-services/alert.service';
import { MessageEntityService } from '../../entity-services/messageEntity/message-entity.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'weado-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  messages: Observable<Message[]>;
  constructor(
    private alertService: AlertService,
    private dialog: MatDialog,
    private msgEntityService: MessageEntityService,
  ) {
    this.messages = msgEntityService.entities$;
  }
  ngOnInit(): void {
    this.msgEntityService.getAll();
  }

  messageDialog() {
    this.dialog.open(MessageDialogComponent)
  }


}
