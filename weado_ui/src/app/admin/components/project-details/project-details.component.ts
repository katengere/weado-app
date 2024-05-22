import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { AddActivitiesComponent } from '../add-activities/add-activities.component';
import { AddImagesComponent } from '../add-images/add-images.component';
import { AddReportComponent } from '../add-report/add-report.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'weado-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project = {
    title: '', summary: '', reportsId: undefined, images: undefined, date: new Date(),
    author: [], fileDoc: undefined, activities: [],
    _id: ''
  }
  constructor(
    private activeRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private msgService: MessageService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  ngOnInit() {
    this.activeRoute.params.subscribe({
      next: (param: Params) => {
        this.projectService.getProjectDetails(param['_id']).subscribe({
          next: res => {
            console.log(res)
            this.project = res;
          },
          error: (err) => {
            this.router.navigateByUrl('/admin/manage');
            this.msgService.message({ title: 'ERROR', text: err.error, bg: 'red' })
          }
        });
      },
      error: (err) => {
        this.router.navigateByUrl('/admin/manage');
        this.msgService.message({ title: 'ERROR', text: err, bg: 'red' })
      }
    });
  }
  addReportDialog() {
    this.dialog.open(AddReportComponent, {
      data: { dialodTitle: 'Add Report', action: 'Upload', projectId: this.project._id }
    });
  }
  editReportDialog(id: string) {
    const report = this.project.reportsId.find((r: any) => r._id == id);
    const dialogRef = this.dialog.open(AddReportComponent, {
      data: report
    });
    dialogRef.afterClosed().subscribe({
      next: res => {
        return this.ngOnInit()
        // this.router.navigateByUrl('/admin/manage/details/'+this.project._id);

      },
      error: err => this.msgService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
  deleteReportDialog(id: string) {
    const report = this.project.reportsId.find((r: any) => r._id == id);
    report.action = 'delete';
    report.context = 'Report';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: report });
    dialogRef.afterClosed().subscribe({
      next: res => {
        return this.ngOnInit();
        // this.router.navigateByUrl('/admin/manage/details/'+this.project._id)
      },
      error: err => this.msgService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
  addActivitiesDialog() {
    this.dialog.open(AddActivitiesComponent, {
      data: this.project
    })
  }
  deleteActivityDialog(id: string | undefined, actvty: string) {
    const activity = this.project.activities.find((act: any) => act == actvty);
    console.log(this.project.activities);
    const obj = {
      action: 'delete', context: 'Activity',
      _id: id, activity
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: obj });
    dialogRef.afterClosed().subscribe({
      next: res => {
        this.project.activities = this.project.activities.filter(act => act != activity);
      },
      error: err => this.msgService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
  addImagesDialog() {
    const dialogRef = this.dialog.open(AddImagesComponent, {
      data: this.project
    });
    dialogRef.afterClosed().subscribe({
      next: res => {
        console.log('dialog closed ', res);

        return this.ngOnInit();
        //  this.router.navigate(['admin', 'manage','details',this.project._id]);
      },
      error: err => this.msgService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
  deleteImageDialog(id: string) {
    const image = this.project.images.find((img: any) => img._id == id);
    image.action = 'delete';
    image.context = 'Image';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: image });
    dialogRef.afterClosed().subscribe({
      next: res => {
        console.log('dialog closed ', res);
        return this.ngOnInit();
        //  this.router.navigateByUrl('/admin/manage/details/'+this.project._id);
      },
      error: err => this.msgService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
}
