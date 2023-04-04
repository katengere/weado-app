import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Classes-Interfaces/project';

const apiUrl = 'http://localhost:8000/weado';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  get projects():Observable<Project[]>{
    return this.http.get<Project[]>(apiUrl+'/projects')
  }
  getProject(year:number):Observable<Project>{
    return this.http.get<Project>(apiUrl+'/projects/'+year);
  }
}
