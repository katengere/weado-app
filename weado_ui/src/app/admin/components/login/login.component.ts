import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes-Interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'weado-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    name: '', password: '',
    _id: '',
    position: '',
    role: '',
    phoneNo: ''
  };

  constructor(
    private msgService: MessageService,
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.login(this.user).subscribe({
        next: (user: User) => {
          this.storageService.saveToken(user.name);
          this.msgService.message({ title: 'SUCCESS', text: 'Wellcome ' + user.name.toUpperCase(), bg: 'green' });
          this.router.navigateByUrl('admin/manage');
        },
        error: (err: any) => {
          this.msgService.message({ title: 'SERVER ERROR', text: err.error.message, bg: 'red' })
        }
      })
      form.resetForm();
    } else {
      this.msgService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!', bg: 'red'
      });
    }

  }
}
