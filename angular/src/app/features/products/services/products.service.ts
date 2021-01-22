import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../model/product";
import {Update} from "@ngrx/entity";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlService = 'http://localhost:8888/products-api/api/';

  constructor(private http: HttpClient) { }

  public retrieveAll = () => {
    // check if observable;
    return this.http.get<Product[]>(this.urlService + 'products');
  }

  public retrieveOne = (productId) => {
    if (typeof productId === "number") productId = productId.toString();

    const params = new HttpParams().set('id', productId);
    return this.http.get<Product>(this.urlService + 'products', {params});
  }

  public add = (product: Product) => {
    return this.http.post(this.urlService, product);
  }

  public update = (product: Update<Product>) => {
    return this.http.put(this.urlService, product);
  }

  public delete = (productId) => {
    return this.http.delete(this.urlService, productId);
  }


}
