import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private msgService: MessageService,
    private projectService: ProjectsService,
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
      return this.msgService.message({
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

    this.projectService.addProject(formData).subscribe({
      next: (project) => {
        this.projectForm.reset();
        this.msgService.message({ title: 'SUCCESS', text: project.title.toUpperCase() + ': Successful added', bg: 'green' });
        this.router.navigateByUrl('/projects/' + new Date(project.date).getFullYear());
      },
      error: (err) => {
        console.log(err);

        this.msgService.message({ title: 'SERVER ERROR', text: err.error.message, bg: 'red' });
      }
    });

  }
}
