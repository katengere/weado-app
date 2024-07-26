import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '../Classes-Interfaces/activity';

@Pipe({
  standalone: true,
  name: 'subTotal'
})
export class SubTotalPipe implements PipeTransform {

  transform(activity: Activity): number {
    return activity.budget.reduce((acc: number, cv: any) => acc + parseInt(cv.total), 0) as unknown as number;
  }

}
