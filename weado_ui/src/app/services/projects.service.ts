import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Classes-Interfaces/project';
import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  get projects():Observable<Project[]>{
    return this.http.get<Project[]>(apiUrl+'/weado/projects');
  }
  getProject(year:number):Observable<Project[]>{
    return this.http.get<Project[]>(apiUrl+'/weado/projects/'+year);
  }
  addProject(project:Project): Observable<Project>{
    return this.http.post<Project>(apiUrl+'/weado/admin/manage/add', project)
  }
}
