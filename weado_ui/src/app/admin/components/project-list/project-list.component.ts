import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ConfirmDialogComponent } from 'src/app/admin/components/confirm-dialog/confirm-dialog.component';

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
  projects2: Project[] = [];
  constructor(
    private projectService: ProjectsService,
    private msgService: MessageService,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.projectService.projects.subscribe({
      next:(projs)=>{
        console.log(projs);

        this.projects2 = projs;
        this.projects = projs.reduce((acc:any[], project, i, arr)=>{
          let year = new Date(project.date).getFullYear();
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

  delProject(id:string | undefined){
    if (id != undefined) {
      const project = this.projects2.find(p=>p._id === id);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:Object.assign({}, project, {action:'delete', context:'Project'})
    });
    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        console.log(res);
        this.ngOnInit();
      },
      error:(err)=>{
        console.log(err);
      this.msgService.message({title:'Delete Error', text:err}, 'bg-danger');
      }
    });
    } else {
      this.msgService.message({title:'Delete Error', text:'Unknown project id'}, 'bg-danger');
    }
  }

  openEditDialog(project:Project){
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data:Object.assign({}, project, {dialodTitle:'Edit Project', action:'Edit'})
    });
    dialogRef.afterClosed().subscribe({
      next(result){
        console.log(result);
      },
      error(err){

      }
    });
  }
}
