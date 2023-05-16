import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddProjectComponent } from '../add-project/add-project.component';
import { Project } from 'src/app/Classes-Interfaces/project';

@Component({
  selector: 'weado-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  project: Project = {
    title: '', summary: '', reportsId: '', images: '', date: new Date(),
    author: [],
    files: '',
    activities: []
  }

  constructor(
    private dialog: MatDialog
  ){}

  openAddProjectDialog(){
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: Object.assign({},this.project,{ dialodTitle:'Add Project', action:'Add'})
    });
    dialogRef.afterClosed().subscribe({
      next(res){
        console.log(res);
        dialogRef.close()
      },
      error(err){console.log(err);
      }
    });
  }
}
