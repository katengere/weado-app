import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Activity } from '../../Classes-Interfaces/activity';


@Injectable()

export class ActivityDataService extends DefaultDataService<Activity> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Activity', http, httpUrlGenerator);
  }
  override getAll(options?: HttpOptions | undefined): Observable<Activity[]> {
    return this.http.get<Activity[]>(environment.apiUrl + '/activities');
  }
}

