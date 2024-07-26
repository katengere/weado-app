import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from '../Classes-Interfaces/alert';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackbar: MatSnackBar
  ) { }
  message(msg: Alert, ...bg: string[]) {
    this.snackbar.openFromComponent(AlertComponent, {
      data: msg,
      duration: 6000,
      panelClass: [...bg],

    })
  }
}
