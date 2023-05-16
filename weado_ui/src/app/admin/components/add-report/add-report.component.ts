import { Component, Inject, OnInit } from '@angular/core';
import { Report } from "../../../Classes-Interfaces/report";
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'weado-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit{
  report: Report = {
    title: '',
    author: '',
    rFile: '',
    projectId: '',
    createdOn: new Date(),
    modifiedOn: new Date(),
    summary: ''
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private msgService: MessageService,
    private projectService: ProjectsService,
    private router: Router
  ){}
  ngOnInit(){
    this.report = this.data
    console.log(this.report);
  }
  onSubmit(form: NgForm){
    if (!form.valid) {
      return this.msgService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!'
      }, 'bg-success', 'text-warning');
    }
    const formData = new FormData();
    formData.append('author', this.report.author)
    formData.append('title', this.report.title)
    formData.append('summary', this.report.summary)
    formData.append('rFile', this.report.rFile)
    formData.append('projectId', this.report.projectId)

    this.projectService.addProjectReport(formData).subscribe({
      next: (res)=>{
        console.log(res);
        this.router.navigateByUrl('/admin/manage/details/'+this.report.projectId);
        return this.msgService.message({
          title: 'REPORT SUBMIT SUCCESS',
          text: `Report added Successfully: ${res}`
        }, 'bg-success', 'text-warning');
      },
      error: (err)=>{
        return this.msgService.message({
          title: 'REPORT SUBMIT ERROR',
          text: `Error submiting a report: ${err}`
        }, 'bg-danger', 'text-warning');
      }
    });
  }
  reportInput(event: any){
    this.report.rFile = event.target.files[0];
  }
}
