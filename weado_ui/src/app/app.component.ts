import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './admin/services/storage.service';
import { MessageService } from './services/message.service';
import { ProjectEntityService } from './services/projectEntity/project-entity.service';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'weado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weado';
  currentYear!: number;
  years: number[] = [];
  url: any = '';

  constructor(
    private projectsService: ProjectsService,
    private pEntityService: ProjectEntityService,
    private msgService: MessageService,
    private storageService: StorageService,
    private route: Router
  ) { }
  ngOnInit() {
    this.pEntityService.getAll();
    this.pEntityService.entities$.subscribe({
      next: projects => {
        this.url = this.route.routerState.toString();
        console.log('url ', this.url);

        this.years = projects.map(p => {
          return new Date(p.date).getFullYear();
        }).filter((year, i, arr) => arr.indexOf(year) == i);
        this.currentYear = Math.max(...this.years);
        console.log(this.currentYear);

      },
      error: error => this.msgService.message({ title: 'SERVER ERROR', text: error.message, bg: 'red' })
    });
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }
  removeUser() {
    return this.storageService.removeToken();
  }
  getUserName() {
    return this.storageService.getUserName();
  }
}
