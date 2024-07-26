import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Project } from '../../Classes-Interfaces/project';


@Injectable()

export class ProjectDataService extends DefaultDataService<Project> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Project', http, httpUrlGenerator);
  }
  override getAll(options?: HttpOptions | undefined): Observable<Project[]> {
    return this.http.get<Project[]>(environment.apiUrl + '/projects');
  }
  override getById(key: number | string, options?: HttpOptions | undefined): Observable<Project> {
    return this.http.get<Project>(environment.apiUrl + '/project/' + key);
  }
  override delete(key: number | string, options?: HttpOptions | undefined): Observable<string> {
    return this.http.delete<string>(environment.apiUrl + '/project/' + key);
  }
  override update(update: Update<Project>): Observable<Project> {
    console.log('update changes ', update.changes);
    console.log('update id ', update.id);
    return this.http.put<Project>(environment.apiUrl + '/project/' + update.id, update.changes.reportsId);
  }

}

