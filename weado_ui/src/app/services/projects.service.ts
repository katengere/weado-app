import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Classes-Interfaces/project';
import { environment } from "../../environments/environment";
import { Report } from '../Classes-Interfaces/report';
import { Image } from '../Classes-Interfaces/image';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  get projects():Observable<Project[]>{
    return this.http.get<Project[]>(apiUrl+'/weado/projects');
  }
  getProjectDetails(id:string):Observable<Project>{
    return this.http.get<Project>(apiUrl+'/weado/projects/details/'+id);
  }
  getProjectSummary(year:number):Observable<Project[]>{
    return this.http.get<Project[]>(apiUrl+'/weado/projects/summary/'+year);
  }
  addProject(project:FormData): Observable<Project>{
    project.forEach(p=>console.log(p));
    return this.http.post<Project>(apiUrl+'/weado/admin/manage/add', project);
  }
  deleteProject(id:string):Observable<string>{
    return this.http.delete<string>(apiUrl+'/weado/admin/manage/delete/'+id);
  }

  // Admin Activities CRUD
  addProjectActivity(project: Project): Observable<Project>{
    return this.http.post<Project>(apiUrl+'/weado/admin/manage/activity/add/'+project._id, project);
  }
  deleteProjectActivity(id:string, activity: string):Observable<null>{
    return this.http.delete<null>(apiUrl+'/weado/admin/manage/activity/delete/'+id+'/'+activity );
  }
  // Admin Image CRUD
  addProjectImage(image: FormData): Observable<Image>{
    return this.http.post<Image>(apiUrl+'/weado/admin/manage/image/add/', image);
  }
  deleteProjectImage(id:string):Observable<Image>{
    return this.http.delete<Image>(apiUrl+'/weado/admin/manage/image/delete/'+id);
  }
  // Admin Report CRUD
  addProjectReport(report:FormData): Observable<Project>{
    return this.http.post<Project>(apiUrl+'/weado/admin/manage/report/add', report);
  }
  deleteProjectReport(id:string):Observable<string>{
    return this.http.delete<string>(apiUrl+'/weado/admin/manage/report/delete/'+id);
  }
}
