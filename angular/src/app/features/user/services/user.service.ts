import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../models/user";
import * as fromRoot from "../store/reducer/user.reducer";
import {takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {UserState} from "../store/reducer/user.reducer";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_SERVICE = 'http://localhost:8888/users-api/users';

  constructor(private http: HttpClient, private store: Store<UserState>) { }

  /**
   * @param email
   * @param password
   */
  signIn = (email:string, password:string) => {
    return this.http.post( this.URL_SERVICE + '/login', {email, password});
  }

  createUser = (user) => {
    return this.http.post<User>(this.URL_SERVICE + '/register', user, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })});
  }

  logout = () => {
    try {
      return this.http.get(this.URL_SERVICE + '/logout');
    } catch (e) {
      console.log(e);
    }
  }

  getUser = () => {
    return this.store.pipe(select(fromRoot.getLoginUser))
  }

  updateUser(userId, changes: Partial<User>): Observable<any> {
    return this.http.put(this.URL_SERVICE + '/' + userId, changes);
  }
}
