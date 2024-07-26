import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Project } from 'src/app/Classes-Interfaces/project';
import { Report } from 'src/app/Classes-Interfaces/report';
import { AlertService } from '../../entity-services/alert.service';
import { ProjectEntityService } from '../../entity-services/projectEntity/project-entity.service';
import { ReportEntityService } from '../../entity-services/reportEntity/report-entity.service';
import { SortReportPipe } from '../../pipes/sort-report.pipe';

@Component({
  selector: 'weado-project-summary',
  standalone: true,
  imports: [CommonModule, SortReportPipe],
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})

export class ProjectSummaryComponent implements OnInit {
  projects: Project[] = [];
  reports: Report[] = [];
  constructor(
    private projectEntityService: ProjectEntityService,
    private reportEntityService: ReportEntityService,
    private msgService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    combineLatest([this.projectEntityService.entities$, this.route.params, this.reportEntityService.entities$]).subscribe({
      next: ([projects, param, reports]) => {
        this.reports = reports;
        this.projects = projects.filter(p => new Date(p.date).getFullYear() == param['year']);
      },
      error: error => this.msgService.message({ title: 'SERVER ERROR', text: error.message, bg: 'red' })
    })
  }
}
