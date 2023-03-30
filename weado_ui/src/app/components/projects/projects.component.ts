import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  years: number[] = [];
  constructor(private projectsService: ProjectsService){

  }
  ngOnInit(): void {
    this.years = this.projectsService.projects.map(p=>p.year).filter((year,i,arr)=>arr.indexOf(year)==i);
  }

}
