import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../products/model/product";
import {CartState} from "../../store/reducer/cart.reducer";
import {Store} from "@ngrx/store";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {getAllProductsInCart} from "../../store/selector/cart.selectors";

@Component({
  selector: 'app-basket-full',
  templateUrl: './basket-full.component.html',
  styleUrls: ['./basket-full.component.scss']
})
export class BasketFullComponent implements OnInit, OnDestroy {
  quantity = [1,2,3,4,5];
  products: Product[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<CartState>) { }

  ngOnInit(): void {
    this.store.select(getAllProductsInCart).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Product[]) => {
      this.products = data.length > 0 ? data: [];
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
