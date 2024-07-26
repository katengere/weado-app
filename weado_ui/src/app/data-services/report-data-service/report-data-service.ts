import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Report } from '../../Classes-Interfaces/report';


@Injectable()

export class ReportDataService extends DefaultDataService<Report> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Report', http, httpUrlGenerator);
  }
  override getAll(options?: HttpOptions | undefined): Observable<Report[]> {
    return this.http.get<Report[]>(environment.apiUrl + '/reports');
  }
  override add(entity: Report, options?: HttpOptions | undefined): Observable<Report> {
    return this.http.post<Report>(environment.apiUrl + '/reports', entity);
  }
  override delete(key: string, options?: HttpOptions | undefined): Observable<string> {
    return this.http.delete<string>(environment.apiUrl + '/report/' + key)
  }
}

