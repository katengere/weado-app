import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projects: Project[]= [];
  constructor(
    private projectsService: ProjectsService,
    private route : ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe((param)=>{
      this.projects = this.projectsService.projects.filter(project=>project.year == parseInt(param['year']))
    })
  }
}
