import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { StorageService } from './admin/services/storage.service';
import { selectUrl } from './entity-metadata';
import { ActivityEntityService } from './entity-services/activityEntity /activity-entity.service';
import { AlertService } from './entity-services/alert.service';
import { ImageEntityService } from './entity-services/imageEntity/image-entity.service';
import { ProjectEntityService } from './entity-services/projectEntity/project-entity.service';
import { ReportEntityService } from './entity-services/reportEntity/report-entity.service';

@Component({
  selector: 'weado-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weado';
  currentYear!: number;
  years: number[] = [];
  url: any = '';

  constructor(
    private store: Store,
    private aEntityService: ActivityEntityService,
    private iEntityService: ImageEntityService,
    private rEntityService: ReportEntityService,
    private pEntityService: ProjectEntityService,
    private msgService: AlertService,
    private storageService: StorageService,
  ) {
    combineLatest([this.pEntityService.entities$, this.store.select(selectUrl)]).subscribe({
      next: ([projects, url]) => {
        this.url = url;
        this.years = projects.map(p => {
          return new Date(p.date).getFullYear();
        }).filter((year, i, arr) => arr.indexOf(year) == i);
        this.currentYear = Math.max(...this.years);
      },
      error: error => this.msgService.message({ title: 'SERVER ERROR', text: error.message, bg: 'red' })
    });
  }
  ngOnInit() {
    this.pEntityService.getAll();
    this.rEntityService.getAll();
    this.aEntityService.getAll();
    this.iEntityService.getAll();
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
