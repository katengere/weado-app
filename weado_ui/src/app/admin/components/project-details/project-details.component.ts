import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, mergeMap } from 'rxjs';
import { Project } from 'src/app/Classes-Interfaces/project';
import { Report } from 'src/app/Classes-Interfaces/report';
import { Activity } from '../../../Classes-Interfaces/activity';
import { Image } from '../../../Classes-Interfaces/image';
import { ActivityEntityService } from '../../../entity-services/activityEntity /activity-entity.service';
import { AlertService } from '../../../entity-services/alert.service';
import { ImageEntityService } from '../../../entity-services/imageEntity/image-entity.service';
import { ProjectEntityService } from '../../../entity-services/projectEntity/project-entity.service';
import { ReportEntityService } from '../../../entity-services/reportEntity/report-entity.service';
import { SubTotalPipe } from '../../../pipes/sub-total.pipe';
import { AddActivitiesComponent } from '../add-activities/add-activities.component';
import { AddImagesComponent } from '../add-images/add-images.component';
import { AddReportComponent } from '../add-report/add-report.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'weado-project-details',
  standalone: true,
  imports: [CommonModule, SubTotalPipe],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project = {
    author: [],
    title: '',
    fileDoc: undefined,
    summary: '',
    reportsId: [],
    images: [],
    date: new Date(),
    activities: [],
    _id: ''
  };
  reports: Report[] = [];
  activities: Activity[] = [];
  images: Image[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private pEntityService: ProjectEntityService,
    private aEntityService: ActivityEntityService,
    private iEntityService: ImageEntityService,
    private rEntityService: ReportEntityService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private router: Router
  ) {
    combineLatest([
      this.activeRoute.params,
      this.pEntityService.entities$,
      this.rEntityService.entities$,
      this.aEntityService.entities$,
      this.iEntityService.entities$
    ]).subscribe({
      next: ([param, projects, reports, activities, images]) => {
        this.project = projects.find(p => p._id == param['_id']) as Project;
        this.reports = reports.filter(r => r.projectId == this.project._id);
        this.activities = activities.filter(a => a.projectId == this.project._id);
        this.images = images.filter(i => i.projectId == this.project._id);
      },
      error: (err) => {
        this.router.navigateByUrl('/weado/admin/manage');
        console.log('project details error ', err);
        this.alertService.message({ title: 'ERROR', text: err.error, bg: 'red' });
      }
    });
  }

  ngOnInit() { }

  addReportDialog() {
    this.dialog.open(AddReportComponent, {
      data: { dialogTitle: 'Add Report', action: 'Upload', project: this.project }
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
      error: err => this.alertService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
  deleteReportDialog(id: string) {
    const report = this.reports.find((r: any) => r._id == id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        ...report, action: 'delete',
        context: 'Report',
        project: Object.assign({ _id: this.project._id, title: this.project.title },
          { reportsId: this.project.reportsId.filter((r: any) => r._id !== id) })
      }
    });
    // dialogRef.afterClosed().subscribe({
    //   next: res => {
    //     console.log('after dialog closed next method called');
    //     this.project = Object.assign({ ...this.project }, { reportsId: this.project.reportsId.filter((r: any) => r._id !== id) });
    //     return this.ngOnInit();
    //     // this.router.navigateByUrl('/admin/manage/details/'+this.project._id)
    //   },
    //   error: err => this.alertService.message({ title: 'ERROR', text: err, bg: 'red' })
    // });
  }
  addActivitiesDialog() {
    const dialogRef = this.dialog.open(AddActivitiesComponent, {
      data: this.project
    });
    combineLatest([dialogRef.afterClosed(), this.activeRoute.params])
      .pipe(mergeMap(([dialog, param]) => this.pEntityService.getByKey(param['_id'])))
      .subscribe({
        next: project => {
          this.project = project;
          console.log(this.project);
        },
        error: err => this.alertService.message({ title: 'ERROR', text: err, bg: 'red' })
      });
  }
  editActivityDialog(id: string) {
    const activity = this.project.activities.find((act: Activity) => act._id == id);
    const dialogRef = this.dialog.open(AddActivitiesComponent, {
      data: { activity, action: 'Edit' }
    });
    dialogRef.afterClosed().subscribe({
      next: res => {
        return this.ngOnInit()
        // this.router.navigateByUrl('/admin/manage/details/'+this.project._id);

      },
      error: err => this.alertService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
  deleteActivityDialog(id: string | undefined, actvty: string) {
    const activity = this.activities.find((act: Activity) => act._id == actvty);
    const obj = {
      action: 'delete', context: 'Activity',
      _id: id, activity
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: obj });
    combineLatest([dialogRef.afterClosed(), this.activeRoute.params])
      .pipe(mergeMap(([dialog, param]) => this.pEntityService.getByKey(param['_id'])))
      .subscribe({
        next: project => {
          this.project = project;
          console.log(this.project);
        },
        error: err => this.alertService.message({ title: 'ERROR', text: err, bg: 'red' })
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
      error: err => this.alertService.message({ title: 'ERROR', text: err, bg: 'red' })
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
      error: err => this.alertService.message({ title: 'ERROR', text: err, bg: 'red' })
    });
  }
}
