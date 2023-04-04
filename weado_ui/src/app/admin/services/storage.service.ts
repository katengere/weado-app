import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }

  saveToken(token:string){
    return localStorage.setItem('username', token);
  }
  getToken(){
    return localStorage.getItem('username');
  }
  removeToken(){
    this.router.navigateByUrl('');
    return localStorage.removeItem('username');
  }
  isLoggedIn(): boolean{
    return this.getToken() ? true : false;
  }
  getUserName(): string | null{
      return this.getToken();
  }
}
