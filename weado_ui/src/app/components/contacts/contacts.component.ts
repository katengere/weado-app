import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'weado-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contact = {
    name:'', email: '', message:''
  }
  constructor(){}
  ngOnInit(): void{}

  onSubmit(form:NgForm){}

}
