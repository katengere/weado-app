import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(
    private projectService: ProjectsService,
    private msgService: MessageService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  deleteProject() {
    this.projectService.deleteProject(this.dialogData._id).subscribe({
      next: res => {
        console.log(res);
        return this.msgService.message({
          title: 'Delete Response', text: 'Successfully deleted project ' + this.dialogData.title, bg: 'green'
        })
      },
      error: err => {
        console.log(err);

        this.msgService.message({ title: 'ERROR', text: err.error, bg: 'red' });
      }
    });
  }
  deleteProjectReport() {
    this.projectService.deleteProjectReport(this.dialogData._id).subscribe({
      next: res => {
        console.log(res);
        this.msgService.message({
          title: 'Delete Response', text: 'Successfully deleted report ' + this.dialogData.title, bg: 'green'
        });
      },
      error: err => {
        console.log(err);

        this.msgService.message({ title: 'ERROR', text: err.error, bg: 'red' })
      }
    });
  }
  deleteProjectActivity() {
    this.projectService.deleteProjectActivity(this.dialogData._id, this.dialogData.activity).subscribe({
      next: res => {
        console.log(res);
        this.msgService.message({
          title: 'Delete Response',
          text: 'Successfully deleted image ' + this.dialogData.activity.slice(0, 10) + ' .....', bg: 'green'
        })
      },
      error: err => {
        console.log(err);

        this.msgService.message({ title: 'ERROR', text: err.error, bg: 'red' })
      }
    });
  }

  deleteProjectImage() {
    this.projectService.deleteProjectImage(this.dialogData._id).subscribe({
      next: res => {
        console.log(res);
        this.msgService.message({
          title: 'Delete Response',
          text: 'Successfully deleted image ' + this.dialogData.title, bg: 'green'
        })
      },
      error: err => {
        console.log(err);

        this.msgService.message({ title: 'ERROR', text: err.error, bg: 'red' })
      }
    });
  }
  getProjects() {

  }
}
