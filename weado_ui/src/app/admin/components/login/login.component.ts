import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
export interface User{
  name: string,
  password: string
}
@Component({
  selector: 'weado-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {name:'', password:''}
  onSubmit(form: NgForm){}
}
