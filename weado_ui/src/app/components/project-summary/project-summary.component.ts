import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/Classes-Interfaces/project';
import { MessageService } from 'src/app/services/message.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'weado-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})

export class ProjectSummaryComponent implements OnInit {
  projects: Project[] = [];
  constructor(
    private projectsService: ProjectsService,
    private msgService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.projectsService.projects.subscribe({
        next: projects => {
          this.projects = projects.filter(p => new Date(p.date).getFullYear() == param['year']);
          console.log(this.projects);
        },
        error: error => this.msgService.message({ title: 'SERVER ERROR', text: error.message, bg: 'red' })
      })
    })
  }
}
