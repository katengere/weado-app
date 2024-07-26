import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { ActivityEntityService } from '../../../entity-services/activityEntity /activity-entity.service';
import { AlertService } from '../../../entity-services/alert.service';
import { ImageEntityService } from '../../../entity-services/imageEntity/image-entity.service';
import { ProjectEntityService } from '../../../entity-services/projectEntity/project-entity.service';
import { ReportEntityService } from '../../../entity-services/reportEntity/report-entity.service';

@Component({
  selector: 'weado-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(
    private pEntityService: ProjectEntityService,
    private iEntityService: ImageEntityService,
    private rEntityService: ReportEntityService,
    private aEntityService: ActivityEntityService,
    private msgService: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    console.log('Dialog Data ', dialogData);
  }

  deleteProject() {
    this.pEntityService.delete(this.dialogData._id).subscribe({
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
    this.rEntityService.delete(this.dialogData._id).subscribe({
      next: res => {
        console.log(res);
        this.pEntityService.getAll();
        this.msgService.message({
          title: 'Report Delete Response', text: 'Successfully deleted report ' + this.dialogData.title, bg: 'green'
        });
      },
      error: err => {
        console.log(err);
        this.msgService.message({ title: 'ERROR', text: err.error, bg: 'red' })
      }
    });
  }
  deleteProjectActivity() {
    this.aEntityService.delete(this.dialogData.activity).subscribe({
      next: res => {
        console.log(res);
        this.msgService.message({
          title: 'Activity Delete Response',
          text: 'Successfully deleted activity ' + this.dialogData.activity.title, bg: 'green'
        })
      },
      error: err => {
        console.log(err);

        this.msgService.message({ title: 'ERROR', text: err.error, bg: 'red' })
      }
    });
  }

  deleteProjectImage() {
    this.iEntityService.delete(this.dialogData._id).subscribe({
      next: res => {
        console.log(res);
        this.msgService.message({
          title: 'Image Delete Response',
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
