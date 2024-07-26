import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../../entity-services/alert.service';
import { ProjectEntityService } from '../../entity-services/projectEntity/project-entity.service';

@Component({
  selector: 'weado-projects',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  years: number[] = [];
  constructor(
    private projectsEntityService: ProjectEntityService,
    private msgService: AlertService
  ) { }
  ngOnInit(): void {
    this.projectsEntityService.entities$.subscribe({
      next: projects => this.years = projects.reduce((acc: number[], project) => {
        if (acc.includes(new Date(project.date).getFullYear())) {
          return acc;
        }
        return [...acc, new Date(project.date).getFullYear()];
      }, []),
      error: error => this.msgService.message({ title: 'SERVER ERROR', text: error.message, bg: 'red' })
    })
  }
}
