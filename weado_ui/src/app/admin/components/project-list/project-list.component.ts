import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

interface GroupedProjects{
  year:number, projects: Project[]
}
@Component({
  selector: 'weado-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit{
  projects: GroupedProjects[] = [];
  constructor(
    private projectService: ProjectsService,
    private msgService: MessageService
  ){}

  ngOnInit() {
    this.projectService.projects.subscribe({
      next:(projs)=>{
        this.projects = projs.reduce((acc:any[], project, i, arr)=>{
          let year = project.year;
          let projObj:GroupedProjects = {year, projects:[]};
          if (!acc.includes(acc[acc.findIndex(p=>p.year==projObj.year)])) {
            projObj.projects.push(project);
            return [...acc, projObj];
          } else  {
            const found = acc.find(p=>p.year==projObj.year);
            if (found) {
              found.projects.push(project);
              acc.splice(acc.findIndex(p=>p.year ==found.year), 1, found)
              return [...acc]
            }
          }
          return acc;
        }, []);
      },
      error:(err)=>{
        this.msgService.message({title:'', text:err.message});
      }
    });
  }
}
