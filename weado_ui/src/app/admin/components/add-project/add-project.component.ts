import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Project } from '../../../Classes-Interfaces/project';
import { AlertService } from '../../../entity-services/alert.service';
import { ProjectEntityService } from '../../../entity-services/projectEntity/project-entity.service';

@Component({
  selector: 'weado-add-project',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private projectEntityService: ProjectEntityService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {
    this.projectForm = this.fb.group({
      author: this.fb.array([this.fb.group({ author: [dialogData.author[0], Validators.required] })]),
      title: ['', Validators.required],
      summary: ['', Validators.required],
      fileDoc: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.projectForm.patchValue(this.dialogData);
    console.log(this.projectForm);
  }

  projectFileInput(event: any) {
    this.projectForm.get('fileDoc')?.patchValue(event.target.files[0]);
  }

  get author(): FormArray {
    return this.projectForm.get('author') as FormArray
  }
  addAuthor() {
    this.author.push(this.fb.group({ author: ['', Validators.required] }));
  }
  removeAuthor(index: number) {
    this.author.removeAt(index);
  }

  onSubmit() {
    if (!this.projectForm.valid) {
      return this.alertService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!', bg: 'red'
      });
    }
    console.log(this.projectForm.get('author')?.value.reduce((acc: any, cv: any) => [...acc, cv.author], []));

    const formData = new FormData();
    formData.append('author', this.projectForm.get('author')?.value.reduce((acc: any, cv: any) => [...acc, cv.author], []))
    formData.append('title', this.projectForm.get('title')?.value)
    formData.append('summary', this.projectForm.get('summary')?.value)
    formData.append('fileDoc', this.projectForm.get('fileDoc')?.value)
    formData.append('date', this.projectForm.get('date'.toString())?.value)

    this.projectEntityService.add(formData as unknown as Project).subscribe({
      next: (project) => {
        this.projectForm.reset();
        this.alertService.message({ title: 'SUCCESS', text: project.title.toUpperCase() + ': Successful added', bg: 'green' });
        this.router.navigateByUrl('/projects/' + new Date(project.date).getFullYear());
      },
      error: (err) => {
        console.log(err);

        this.alertService.message({ title: 'SERVER ERROR', text: err.error.message, bg: 'red' });
      }
    });

  }
}
