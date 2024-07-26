import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../Classes-Interfaces/activity';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => {
      console.log('a time ', new Date(String(a.createdOn)).getMilliseconds());
      console.log('b time ', b.createdOn);
      return new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
    });
  }

}
