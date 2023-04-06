import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  years:number[] = [2017,2018,2019,2020,2021,2022,2023];
  project: Project = {
    year:2023,
    title: '',
    content: '',
    reports: [],
    images: [],
    date: new Date()
  }

  constructor(
    private msgService: MessageService,
    private projectService: ProjectsService,
    private router: Router
  ){}

  onSubmit(form:NgForm){
    if (!form.valid) {
      return this.msgService.message('Please make sure to fill all required fields!');
    }
    this.projectService.addProject(form.value).subscribe({
      next:(project)=>{
        form.resetForm();
        this.router.navigateByUrl('/projects/'+project.year);
      },
      error:(err)=>{
        console.log(err);
        this.msgService.message(err.message);
      }
    });

  }
}
