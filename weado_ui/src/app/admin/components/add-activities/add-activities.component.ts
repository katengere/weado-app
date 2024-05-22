import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent {
  activitiesForm: FormGroup;
  constructor(
    private msgService: MessageService,
    private projectService: ProjectsService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private dialogData: Project
  ) {
    this.activitiesForm = this.fb.group({
      activities: this.fb.array([this.fb.group({ activities: ['', Validators.required] })])
    });
  }
  ngOnInit() {
    this.activitiesForm.get('activities')?.patchValue(this.dialogData.activities);
  }
  get activities(): FormArray {
    return this.activitiesForm.get('activities') as FormArray;
  }
  addActivity() {
    this.activities.push(this.fb.group({ activities: ['', Validators.required] }));
  }
  removeActivity(index: number) {
    return this.activities.removeAt(index);
  }
  onSubmit() {
    if (!this.activitiesForm.valid) {
      return this.msgService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!', bg: 'red'
      });
    }
    const activities: string[] = this.activitiesForm.value.activities.reduce((acc: any[], cv: any) => {
      acc.push(cv.activities);
      return acc
    }, []);
    activities.forEach(activity => this.dialogData.activities.push(activity))


    this.projectService.addProjectActivity(this.dialogData).subscribe({
      next: (project) => {
        this.activitiesForm.reset();
        console.log(project);
        this.msgService.message({ title: 'SUCCESS', text: project.title.toUpperCase() + ': Successful added', bg: 'green' });
      },
      error: (err) => {
        this.msgService.message({ title: 'SERVER ERROR', text: err.error, bg: 'red' });
      }
    });
  }
}
