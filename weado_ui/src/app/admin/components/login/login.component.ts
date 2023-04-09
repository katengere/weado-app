import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Classes-Interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'weado-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user: User = {name:'', password:''};

  constructor(
    private msgService: MessageService,
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
    ){
  }
  ngOnInit(): void {}

  onSubmit(form: NgForm){
    if (form.valid) {
      this.userService.login(this.user).subscribe(
        user=>{
          this.storageService.saveToken(user.name);
          this.msgService.message({title:'SUCCESS', text:'Wellcome '+ user.name.toUpperCase()}, 'bg-success');
          this.router.navigateByUrl('admin/manage');
        },
        err=>{
          this.msgService.message({title:'SERVER ERROR' ,text: err.error.message}, 'bg-danger')
        }
      )
      form.resetForm();
    } else {
      this.msgService.message({
        title:'FORM ERROR',
        text: 'Please make sure to fill all required fields!'
      }, 'bg-warning', 'text-danger');
    }

  }
}
