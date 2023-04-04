import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'weado-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @ViewChild('msgButton', { read: HTMLButtonElement })
  msgButton!: HTMLButtonElement;
  message = 'hallo world';
  ngOnInit(): void{
    setTimeout(() => {
      this.message = ''
    }, 3000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      // this.msgAlert()
    }
  }
  msgAlert(el:HTMLElement){
    el.click();
  }
}
