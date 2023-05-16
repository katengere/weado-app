import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatDialog } from "@angular/material/dialog";
import { AddReportComponent } from '../add-report/add-report.component';
import { AddActivitiesComponent } from '../add-activities/add-activities.component';
import { AddImagesComponent } from '../add-images/add-images.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'weado-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
  project: Project = {title: '', summary: '', reportsId: undefined, images: undefined, date: new Date(),
    author: [], files: undefined, activities: []}
  constructor(
    private activeRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private msgService: MessageService,
    private dialog: MatDialog
  ){}
    ngOnInit(){
      this.activeRoute.params.subscribe({
        next:(param: Params)=>{
          this.projectService.getProjectDetails(param['_id']).subscribe({
            next:res=>{
              console.log(res);
             this.project=res;
            }
          });
        },
        error: (err)=>this.msgService.message({title:'ERROR', text:err}, 'bg-danger')
      });
    }
    addReportDialog(){
      this.dialog.open(AddReportComponent, {
        data: {dialodTitle:'Add Report',action:'Upload', projectId: this.project._id}
      })
    }
    editReportDialog(id:string){
      const report = this.project.reportsId.find((r:any)=>r._id==id);
      this.dialog.open(AddReportComponent, {
        data: report
      })
    }
    deleteReportDialog(id:string){
      const report = this.project.reportsId.find((r:any)=>r._id==id);
      report.action = 'delete';
      this.dialog.open(ConfirmDialogComponent, {data:report})
    }
    addActivitiesDialog(){
      this.dialog.open(AddActivitiesComponent, {
        data: this.project
      })
    }
    addImagesDialog(){
      const dialogRef = this.dialog.open(AddImagesComponent, {
        data: this.project
      });
      dialogRef.afterClosed().subscribe({
        next: res=>dialogRef.close(),
        error: err=>this.msgService.message({title:'ERROR', text:err}, 'bg-danger')
      });
    }
}
