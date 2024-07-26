import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Image } from '../../Classes-Interfaces/image';


@Injectable()

export class ImageDataService extends DefaultDataService<Image> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Image', http, httpUrlGenerator);
  }
  override getAll(options?: HttpOptions | undefined): Observable<Image[]> {
    return this.http.get<Image[]>(environment.apiUrl + '/images');
  }

  override getById(key: string): Observable<Image> {
    return this.http.get<Image>(environment.apiUrl + '/image/' + key);
  }
}

