import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {basketActionTypes} from "../action/basket.actions";
import {Router} from "@angular/router";
import { concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {ProductsService} from "../../services/products.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class BasketEffects {

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(basketActionTypes.addProduct),
      concatMap((action) => this.productService.add(action.product)),
      tap(() => {
        this.toast.success('Product added successfully !');
        this.router.navigateByUrl('/admin/products');
      })
    ),
  {dispatch: false}
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(basketActionTypes.deleteProduct),
      concatMap((action) => this.productService.delete(action.productId)),
      tap(() => this.router.navigateByUrl('/admin/products').then(() => this.toast.success('Product successfully deleted')))
    ),
    {dispatch:false}
  )

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(basketActionTypes.updateProduct),
      switchMap((action) => {
        return this.productService.update(action.product.id, action.product.changes);
      }),
      map((data) => {
        if (data.success) {
          this.toast.success('Product updated successfully !');
          return basketActionTypes.updateProductSuccess();
        }
        else  {
          this.toast.warning('Product cannot be updated');
          return basketActionTypes.updateProductFailed({error: data});
        }
      }),
      tap(() =>  this.router.navigateByUrl('/admin/products'))
    )
  );

  constructor(private productService: ProductsService, private actions$: Actions,
              private router: Router, private toast: ToastrService) {}

}
