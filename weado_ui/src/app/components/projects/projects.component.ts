import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  years: number[] = [];
  constructor(
    private projectsService: ProjectsService,
    private msgService: MessageService
  ) { }
  ngOnInit(): void {
    this.projectsService.projects.subscribe({
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
