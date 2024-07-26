import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivityEntityService } from '../../../entity-services/activityEntity /activity-entity.service';
import { AlertService } from '../../../entity-services/alert.service';
import { ProjectEntityService } from '../../../entity-services/projectEntity/project-entity.service';

@Component({
  selector: 'weado-add-activities',
  standalone: true,
  imports: [
    MatDialogModule, ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent {
  activityForm: FormGroup;
  budgetItems!: FormGroup;
  grandTotal = 0;
  constructor(
    private alertService: AlertService,
    private projectEntityService: ProjectEntityService,
    private activityEntityService: ActivityEntityService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.activityForm = this.fb.group({
      _id: [dialogData.action ? dialogData.activity.projectId : dialogData._id],
      projectId: [dialogData.action ? dialogData.activity.projectId : dialogData._id],
      title: ['', Validators.required],
      description: ['', Validators.required],
      createdOn: [dialogData.action ? dialogData.activity.createdOn : new Date()],
      budget: this.fb.array([])
    });
  }
  ngOnInit() {
    if (this.dialogData.action) {
      this.activityForm.patchValue({ ...this.dialogData.activity, budget: [] });
      for (const item of this.dialogData.activity.budget) {
        this.items.push(this.fb.group({
          item: [item.item, Validators.required],
          cost: [item.cost, Validators.required],
          quantity: [item.quantity, Validators.required],
          total: [item.total, Validators.required]
        }));
      }
      console.log('EDIT dialog data ', this.dialogData)
      this.dialogData.action ? console.log('EDIT ', this.activityForm.value) : console.log('ADD ', this.activityForm.value);
    }
    this.calculateGrandTotal();
  }
  get items(): FormArray {
    return this.activityForm.get('budget') as FormArray;
  }

  addItem() {
    if (this.items.length < 1) {
      for (const item of ['venue', 'meals', 'stationaries', 'transport', 'perdiem', 'facilitator', 'prep cost']) {
        this.items.push(this.fb.group({
          item: [item, Validators.required],
          cost: [0, Validators.required],
          quantity: [0, Validators.required],
          total: [0, Validators.required]
        }));
      }
    }
    this.items.push(this.fb.group({
      item: ['', Validators.required],
      cost: [0, Validators.required],
      quantity: [0, Validators.required],
      total: [0, Validators.required]
    }));
  }

  removeItem(index: number) {
    return this.items.removeAt(index);
  }

  onItemChange(index: number) {
    const allBudgetItems = this.activityForm.get('budget') as FormArray;
    this.budgetItems = allBudgetItems.at(index) as FormGroup;
    console.log(this.budgetItems.value);

    const cost = this.budgetItems.get('cost')?.value;
    const quantity = this.budgetItems.get('quantity')?.value;
    this.budgetItems.get('total')?.setValue(cost * quantity);
    this.calculateGrandTotal();
  }
  calculateGrandTotal() {
    const array = this.activityForm.getRawValue().budget;
    let gTotal = 0;
    array.forEach((t: any) => gTotal = gTotal + parseInt(t.total));
    this.grandTotal = gTotal;
  }

  onSubmit() {
    console.log('activity form ', this.activityForm.value);
    if (!this.activityForm.valid) {
      return this.alertService.message({
        title: 'FORM ERROR',
        text: 'Please make sure to fill all required fields!', bg: 'red'
      });
    }
    if (this.dialogData.action) {
      this.activityEntityService.update(this.activityForm.value).subscribe({
        next: (project) => {
          this.dialog.closeAll();
          console.log(project);
          this.alertService.message({
            title: 'Edit Activity Success',
            text: this.activityForm.get('title')?.value + ': Successfully Edited',
            bg: 'green'
          });
          this.activityForm.reset();
        },
        error: (err) => {
          this.alertService.message({ title: 'SERVER ERROR', text: err.error, bg: 'red' });
        }
      })
    } else {
      this.activityEntityService.add(this.activityForm.value).subscribe({
        next: (project) => {
          this.dialog.closeAll();
          console.log(project);
          this.alertService.message({
            title: 'Add Activity Success',
            text: this.activityForm.get('title')?.value + ': Successfully Added',
            bg: 'green'
          });
          this.activityForm.reset();
        },
        error: (err) => {
          this.alertService.message({ title: 'SERVER ERROR', text: err.error, bg: 'red' });
        }
      });
    }
  }
}
