import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Message } from '../../Classes-Interfaces/message';
import { AlertService } from '../../entity-services/alert.service';
import { MessageEntityService } from '../../entity-services/messageEntity/message-entity.service';

@Component({
  selector: 'weado-message-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css'
})
export class MessageDialogComponent {
  message: Message = {
    _id: '', name: '', email: '', text: '',
    createdOn: new Date()
  }
  constructor(
    private alertService: AlertService,
    private msgEntityService: MessageEntityService,
    private dialog: MatDialog
  ) { }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.alertService.message({
        title: 'FORM ERROR', text: 'Please make sure to fill all required fields!', bg: 'red'
      })
    } else {
      this.msgEntityService.add(this.message).subscribe({
        next: msg => {
          this.dialog.closeAll();
          this.alertService.message({
            title: 'Message Submit Success',
            text: 'Message Successfully added',
            bg: 'green'
          })
        }
      });
    }
  }

}
