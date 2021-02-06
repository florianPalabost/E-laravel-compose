import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Role} from "../model/role";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlService = 'http://localhost:8888/users-api/roles';

  constructor(private http: HttpClient) { }

  private HTTP_PARAMS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })};

  public retrieveAll = () => {
    return this.http.get<Role[]>(this.urlService, this.HTTP_PARAMS);
  }

  public retrieveOne = (name: string) => {

    return this.http.get<Role>(this.urlService  + name);
  }

  public add = (role: Role) => {
    return this.http.post<Role>(this.urlService, role, this.HTTP_PARAMS);
  }

  public update = (role: Role) => {
    return this.http.put(this.urlService, role, this.HTTP_PARAMS);
  }

  public delete = (name: number) => {
    return this.http.delete(this.urlService + name);
  }


}
