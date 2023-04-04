import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projects: Project[]= [];
  constructor(
    private projectsService: ProjectsService,
    private msgService: MessageService,
    private route : ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe((param)=>{
      this.projectsService.projects.subscribe(
        projects=> this.projects = projects.filter(project=>project.year == parseInt(param['year'])),
        error=>this.msgService.message(error)
      )
    })
  }
}
