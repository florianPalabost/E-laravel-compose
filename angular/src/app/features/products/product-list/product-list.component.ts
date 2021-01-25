import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadProducts} from "../store/action/product.actions";
import {getAllProducts} from "../store/selector/product.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ProductState} from "../store/reducer/product.reducer";
import {Product} from "../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: any;
  destroy$ = new Subject<boolean>();

  constructor(private store: Store<ProductState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    this.store.select(getAllProducts).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Product[]) => {
      this.products = data.length > 0 ? data : [];
    } )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
