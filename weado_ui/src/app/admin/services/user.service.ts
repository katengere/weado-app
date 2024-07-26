import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Classes-Interfaces/user';
import { environment } from "../../../environments/environment";


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(apiUrl + '/users/login', user);
  }
  register(user: FormData): Observable<User> {
    return this.http.post<User>(apiUrl + '/users/register', user);
  }
}
