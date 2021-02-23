import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductState} from "../../store/reducer/product.reducer";
import {Store} from "@ngrx/store";
import {selectOneProduct} from "../../store/selector/product.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {loadOneProduct} from "../../store/action/product.actions";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId: number;
  product: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private store: Store<ProductState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = Number(params.get('id'));

      this.store.dispatch(loadOneProduct({productId: this.productId}));

      this.store.select(
        selectOneProduct({productId: this.productId})).pipe(
        takeUntil(this.destroy$)
      ).subscribe((product: Product) => {
        this.product = product;
      })

    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
