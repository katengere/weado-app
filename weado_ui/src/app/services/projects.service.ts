import { Injectable } from '@angular/core';
export interface Project {
  year:number;
  title: string;
  content: string;
  reports?: any[];
  images?: any[];
  date: Date
}
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private _projects: Project[] = [
    {year:2014, title:'project 1', content:'project 1 content', date:new Date(2014,1,5)},
    {year:2014, title:'project 2', content:'project 2 content', date:new Date(2014,2,15)},
    {year:2015, title:'project 1', content:'project 1 content', date:new Date(2015,1,5)},
    {year:2015, title:'project 2', content:'project 2 content', date:new Date(2015,5,25)},
    {year:2016, title:'project 1', content:'project 1 content', date:new Date(2016,10,6)},
    {year:2016, title:'project 2', content:'project 2 content', date:new Date(2016,11,12)},
    {year:2016, title:'project 3', content:'project 3 content', date:new Date(2016,6,21)},
    {year:2017, title:'project 1', content:'project 1 content', date:new Date(2017,4,9)},
    {year:2017, title:'project 2', content:'project 2 content', date:new Date(2017,8,8)},
    {year:2018, title:'project 1', content:'project 1 content', date:new Date(2018,7,17)},
  ];
  constructor() { }
  get projects():Project[]{
    return this._projects
  }
}
