import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../Classes-Interfaces/project';
import { Report } from '../Classes-Interfaces/report';

@Pipe({
  name: 'sortReport',
  standalone: true
})
export class SortReportPipe implements PipeTransform {

  transform(reports: Report[], project: Project): Report[] {
    return reports.filter(r => r.projectId == project._id);
  }

}
