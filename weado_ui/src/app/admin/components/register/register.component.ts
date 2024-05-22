import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes-Interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'weado-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  weadoAdmin: User = {
    name: '',
    password: '',
    user_Img: '',
    _id: '',
    position: '',
    role: '',
    phoneNo: ''
  };
  constructor(
    private userService: UserService,
    private msgService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onRegister() {
    const { name, password, user_Img } = this.weadoAdmin;
    if (!name || !password) {
      return this.msgService.message({
        title: 'ERROR', text: 'tafadhali hakikisha umejaza fomu kwa usahihi', bg: 'red'
      });
    }

    const formData = new FormData();
    formData.append('name', this.weadoAdmin.name);
    formData.append('password', this.weadoAdmin.password);
    formData.append('user_Img', this.weadoAdmin.user_Img || '');
    console.log(formData);

    return this.userService.register(formData)
      .subscribe({
        next: (res) => {
          this.msgService.message({
            title: 'SUCCESS', text: 'umefanikiwa kujisajili SAgPA', bg: 'green'
          });
          console.log(res);
          return this.router.navigateByUrl('admin/manage');
        },
        error: (error) => {
          console.log(error);
          return this.msgService.message({
            title: 'ERROR', text: error.error, bg: 'red'
          });
        }
      });
  }

  onUserImgSelect(event: any) {
    this.weadoAdmin.user_Img = <File>event.target.files[0];
    console.log(this.weadoAdmin.user_Img);
  }

}
