import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/Classes-Interfaces/user';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User):Observable<User>{
    return this.http.post<User>(apiUrl+'/weado/admin', user);
  }
}
