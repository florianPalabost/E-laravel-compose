import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Product} from "../model/product";
import {Update} from "@ngrx/entity";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlService = 'http://localhost:8888/products-api/api/products';

  private HTTP_PARAMS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With',
      // 'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    })};

  constructor(private http: HttpClient) { }

  public retrieveAll = () => {
    // check if observable;
    return this.http.get<Product[]>(this.urlService);
  }

  public retrieveOne = (productId) => {
    if (typeof productId === "number") productId = productId.toString();

    return this.http.get<Product>(this.urlService + '/' + productId);
  }

  public add = (product: Product) => {
    return this.http.post(this.urlService, product);
  }

  public update = (productId, changes: Partial<Product>): Observable<any> => {
    return this.http.put(this.urlService + '/' + productId, changes);
  }

  public delete = (productId) => {
    return this.http.delete(this.urlService + '/' + productId);
  }


}
