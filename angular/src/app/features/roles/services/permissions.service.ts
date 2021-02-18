import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Permission} from "../model/permission";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private urlService = 'http://localhost:8888/users-api/permissions';

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
    return this.http.get<Permission[]>(this.urlService, this.HTTP_PARAMS);
  }

  public retrieveOne = (name: string) => {

    return this.http.get<Permission>(this.urlService  + name);
  }

  public add = (permission: Permission) => {
    return this.http.post<Permission>(this.urlService, permission, this.HTTP_PARAMS);
  }

  public update = (permission: Permission) => {
    return this.http.put(this.urlService, permission, this.HTTP_PARAMS);
  }

  public delete = (name: number) => {
    return this.http.delete(this.urlService + name);
  }


}
