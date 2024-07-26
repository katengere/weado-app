import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Image } from 'src/app/Classes-Interfaces/image';
import { Project } from 'src/app/Classes-Interfaces/project';
import { AlertService } from '../../../entity-services/alert.service';
import { ImageEntityService } from '../../../entity-services/imageEntity/image-entity.service';

@Component({
  selector: 'weado-add-images',
  standalone: true,
  imports: [MatDialogModule, FormsModule],
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  image!: Image
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Project,
    private alertService: AlertService,
    private imageEntityService: ImageEntityService,
    private router: Router
  ) { }
  ngOnInit() {
    this.image = this.data.images
    console.log(this.image);
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return this.alertService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!', bg: 'red'
      });
    }
    const formData = new FormData();
    formData.append('title', this.image.title)
    formData.append('description', this.image.description)
    formData.append('file', this.image.file)
    formData.append('projectId', this.data._id as string)

    this.imageEntityService.add(formData as unknown as Image).subscribe({
      next: (res) => {
        console.log(res);
        this.alertService.message({
          title: 'IMAGE UPLOAD SUCCESS',
          text: `Image Added Successfully to Project: ${res.title}`, bg: 'green'
        });
        return this.router.navigate(['admin', 'manage', 'details', this.data._id]);
      },
      error: (err) => {
        console.log(err);

        return this.alertService.message({
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
