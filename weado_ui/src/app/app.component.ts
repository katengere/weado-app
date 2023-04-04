import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { MessageService } from './services/message.service';
import { StorageService } from './admin/services/storage.service';

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
     this.projectsService.projects.subscribe(
      projects=> {
        this.years =projects.map(p=>p.year).filter((year,i,arr)=>arr.indexOf(year)==i);
        this.currentYear = Math.max(...this.years);
      },
      error=>this.msgService.message(error.message)
    );
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
