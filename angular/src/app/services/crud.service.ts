import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
// T1 model, T2 service ?
export class CrudService<T> {

  constructor(private service: T, private httpClient: HttpClient) { }

  public retrieveAll = () => {

  }
}
