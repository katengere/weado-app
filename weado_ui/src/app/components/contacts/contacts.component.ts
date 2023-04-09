import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'weado-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contact = {
    name:'', email: '', message:''
  }
  constructor(
    private msgService: MessageService
  ){}
  ngOnInit(): void{}

  onSubmit(form:NgForm){
    if (!form.valid) {
      this.msgService.message({
        title:'FORM ERROR', text:'Please make sure to fill all required fields!'
      }, 'bg-warning')
    }
  }

}
