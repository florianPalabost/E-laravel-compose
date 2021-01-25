import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {productActionTypes} from "../action/product.actions";
import {Router} from "@angular/router";
import { concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {ProductsService} from "../../services/products.service";

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.loadProducts),
      concatMap( () => {
       return this.productService.retrieveAll();
      }),
      map((doc: any) => {
        return productActionTypes.productsLoaded({products: doc});
      })
    )
  );

  loadOneProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.loadOneProduct),
      concatMap( (action) => {
        return this.productService.retrieveOne(action.productId);
      }),
      map((doc: any) => {
        return productActionTypes.oneProductLoaded({product: doc});
      })
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.addProduct),
      concatMap((action) => this.productService.add(action.product)),
      // tap(() => this.router.navigateByUrl('/products'))
    ),
  {dispatch: false}
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.deleteProduct),
      concatMap((action) => this.productService.delete(action.productId)),
      tap(() => this.router.navigateByUrl('/products'))
    ),
    {dispatch:false}
  )

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.updateProduct),
      switchMap((action) => {
        return this.productService.update(action.product);
      }),
      map((x) => productActionTypes.updateProductSuccess())
    )
  );

  constructor(private productService: ProductsService, private actions$: Actions, private router: Router) {}

}
