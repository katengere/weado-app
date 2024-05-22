import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from "../../../environments/environment";
import { User } from '../../Classes-Interfaces/user';
import { StorageService } from '../../admin/services/storage.service';

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
  timeout: 3000, // request timeout
}

@Injectable({
  providedIn: 'root'
})
export class UserEntityService extends EntityCollectionServiceBase<User> {
  private id!: string;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient, private storage: StorageService
  ) {
    super('User', serviceElementsFactory);
  }

  // override getAll(pos?:any): Observable<UserTypeInterface[]> {
  //   console.log('coordnates are ', pos);    
  //   if (!pos) {
  //     pos = {lat:-6.8059136, lng: 39.2331264}
  //   }
  //   return super.getAll(pos);
  // }

  // override add(entity: UserTypeInterface, pos?:any): Observable<UserTypeInterface> {  
  //   this.id = this.storage.getId() as string;
  //   console.log('register id ', this.id);

  //   if (!pos) {
  //     pos = {lat:-6.8059936, lng: 39.2331564};
  //     entity.coords= [pos.lng, pos.lat];
  //   }
  //   if (entity.userInfos.age!=null|| entity.userInfos.nation_Id!=null) {       
  //   return this.http.post<UserTypeInterface>(environment.apiUrl+'/users/register/'+this.id, entity, {
  //     headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.storage.getToken()}`
  //     })
  //     });
  // } 
  //   console.log('login called');

  //   return this.http.post<UserTypeInterface>(environment.apiUrl+'/users/login', entity);
  // }
  // override getByKey(key: string ): Observable<UserTypeInterface> {    
  //   return this.http.get<UserTypeInterface>(environment.apiUrl+'/users/'+key,{
  //     headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.storage.getToken()}`
  //     })
  //     });
  // }

  // override delete(entity: UserTypeInterface): Observable<string | number>;
  // override delete(key: string | number): Observable<string | number>;
  // override delete(key: unknown): Observable<string | number> {
  //   this.id = this.storage.getId() as string;    
  //   return this.http.delete<string>(environment.apiUrl+'/users/'+this.id+'/'+key, {
  //     headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.storage.getToken()}`
  //     })
  //     });
  // }

  // override update(update: UserTypeInterface): Observable<UserTypeInterface> {
  //   return this.http.put<UserTypeInterface>(environment.apiUrl+'/users/update/'+update._id, update, {
  //     headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.storage.getToken()}`
  //     })
  //     });
  // }
}
