import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Alert } from 'src/app/Classes-Interfaces/alert';

@Component({
  selector: 'weado-alert',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Alert
  ) { }
}
