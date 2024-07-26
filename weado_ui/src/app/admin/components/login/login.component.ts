import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes-Interfaces/user';
import { AlertService } from '../../../entity-services/alert.service';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { UserEntityService } from '../../services/userEntity/user-entity.service';

@Component({
  selector: 'weado-login',
  standalone: true,
  imports: [FormsModule],
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
    private msgService: AlertService,
    private userService: UserService,
    private userEntityService: UserEntityService,
    private router: Router,
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.login(this.user).subscribe({
        next: (user) => {
          this.storageService.saveToken(user.name);
          this.msgService.message({ title: 'SUCCESS', text: 'Wellcome ' + user.name.toUpperCase(), bg: 'green' });
          this.router.navigateByUrl('weado/admin/manage');
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
