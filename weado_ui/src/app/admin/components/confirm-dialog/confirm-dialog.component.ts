import { Component, Inject } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'weado-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(
    private projectService: ProjectsService,
    private msgService: MessageService,
    @Inject(MAT_DIALOG_DATA) public dialogData:any
  ){}

  deleteProject(){
    this.projectService.deleteProject(this.dialogData._id).subscribe({
      next: res=>this.msgService.message({title:'Delete Response', text:res}, 'bg-success'),
      error: err=>this.msgService.message({title:'ERROR', text:err.error})
    });
  }
  deleteProjectReport(){
    this.projectService.deleteProjectReport(this.dialogData._id).subscribe({
      next: res=>this.msgService.message({title:'Delete Response', text:res}, 'bg-success'),
      error: err=>this.msgService.message({title:'ERROR', text:err.error})
    });
  }
  getProjects(){

  }
}
