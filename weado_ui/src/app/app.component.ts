import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { MessageService } from './services/message.service';
import { StorageService } from './admin/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'weado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weado';
  currentYear!: number;
  years!:number[];

  constructor(
    private projectsService: ProjectsService,
    private msgService: MessageService,
    private storageService: StorageService
    ){}
  ngOnInit(){
     this.projectsService.projects.subscribe({
       next: projects=> {
        this.years =projects.map(p=>p.year).filter((year,i,arr)=>arr.indexOf(year)==i);
        console.log(this.years);
        this.currentYear = Math.max(...this.years);
      },
      error: error=>this.msgService.message({title:'SERVER ERROR', text:error.message}, 'bg-danger')
     });
  }

  isLoggedIn():boolean{
    return this.storageService.isLoggedIn();
  }
  removeUser(){
    return this.storageService.removeToken();
  }
  getUserName(){
    return this.storageService.getUserName();
  }
}
