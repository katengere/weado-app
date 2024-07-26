import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Report } from "../../../Classes-Interfaces/report";
import { AlertService } from '../../../entity-services/alert.service';
import { ProjectEntityService } from '../../../entity-services/projectEntity/project-entity.service';
import { ReportEntityService } from '../../../entity-services/reportEntity/report-entity.service';

@Component({
  selector: 'weado-add-report',
  standalone: true,
  imports: [MatDialogModule, FormsModule],
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
  report: Report = {
    title: '',
    author: '',
    rFile: '',
    projectId: '',
    createdOn: new Date(),
    modifiedOn: new Date(),
    summary: '',
    _id: '',
    fileUrl: ''
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private msgService: AlertService,
    private projectEntityService: ProjectEntityService,
    private reportEntityService: ReportEntityService,
    private router: Router
  ) { }
  ngOnInit() {
    this.report.projectId = this.dialogData.project._id;
    console.log(this.dialogData);
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return this.msgService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!', bg: 'red'
      });
    }
    const formData = new FormData();
    formData.append('author', this.report.author)
    formData.append('title', this.report.title)
    formData.append('summary', this.report.summary)
    formData.append('rFile', this.report.rFile)
    formData.append('projectId', this.report.projectId)


    this.reportEntityService.add(formData as unknown as Report).subscribe({
      next: (report: any) => {
        console.log(report);
        this.projectEntityService.getAll();
        return this.msgService.message({
          title: 'REPORT SUBMIT SUCCESS',
          text: `Successfully added Report: ${this.report.title}`, bg: 'red'
        });
      },
      error: (err: any) => {
        console.log('error adding a report ', err);
        return this.msgService.message({
          title: 'REPORT SUBMIT ERROR',
          text: `Error submiting a report: ${err}`, bg: 'red'
        });
      }
    });
  }
  reportInput(event: any) {
    this.report.rFile = event.target.files[0];
  }
}
