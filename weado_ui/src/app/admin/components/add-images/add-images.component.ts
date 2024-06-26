import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Image } from 'src/app/Classes-Interfaces/image';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  image!: Image
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Project,
    private msgService: MessageService,
    private projectService: ProjectsService,
    private router: Router
  ) { }
  ngOnInit() {
    this.image = this.data.images
    console.log(this.image);
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return this.msgService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!', bg: 'red'
      });
    }
    const formData = new FormData();
    formData.append('title', this.image.title)
    formData.append('description', this.image.description)
    formData.append('file', this.image.file)
    formData.append('projectId', this.data._id as string)

    this.projectService.addProjectImage(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.msgService.message({
          title: 'IMAGE UPLOAD SUCCESS',
          text: `Image Added Successfully to Project: ${res.title}`, bg: 'green'
        });
        return this.router.navigate(['admin', 'manage', 'details', this.data._id]);
      },
      error: (err) => {
        console.log(err);

        return this.msgService.message({
          title: 'IMAGE UPLOAD ERROR',
          text: `Error uploading an image: ${err.error.message}`, bg: 'red'
        });
      }
    });
  }
  imageInput(event: any) {
    this.image.file = event.target.files[0];
  }
}
