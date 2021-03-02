import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {cartActionTypes} from "../action/cart.actions";
import {Router} from "@angular/router";
import { concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {ProductsService} from "../../../products/services/products.service";

@Injectable()
export class CartEffects {

  // createProduct$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cartActionTypes.addProductToCart),
  //     concatMap((action) => this.productService.add(action.product)),
  //     tap(() => {
  //       this.toast.success('Product added successfully !');
  //       this.router.navigateByUrl('/admin/products');
  //     })
  //   ),
  // {dispatch: false}
  // );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActionTypes.deleteProductFromCart),
      // concatMap((action) => this.productService.delete(action.productId)),
      tap(() => this.router.navigateByUrl('/products').then(() => this.toast.success('Product successfully deleted')))
    ),
    {dispatch:false}
  )


  constructor(private productService: ProductsService, private actions$: Actions,
              private router: Router, private toast: ToastrService) {}

}
