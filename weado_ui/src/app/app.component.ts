import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'weado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weado';
  currentYear!: number
  constructor(private projectsService: ProjectsService){}
  ngOnInit(){
    const years = this.projectsService.projects.map(p=>p.year).filter((year,i,arr)=>arr.indexOf(year)==i);
    this.currentYear = Math.max(...years);
  }
}
