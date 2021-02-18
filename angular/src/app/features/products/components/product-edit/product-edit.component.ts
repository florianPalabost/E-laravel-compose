import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Store} from "@ngrx/store";
import {ProductState} from "../../store/reducer/product.reducer";
import {Observable, Subject} from "rxjs";
import {getAllProducts, selectAllProducts, selectOneProduct} from "../../store/selector/product.selectors";
import {loadOneProduct, updateProduct} from "../../store/action/product.actions";
import {takeUntil} from "rxjs/operators";
import {AppState} from "../../store";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  productId: number;
  product: Product;
  editProductForm: any;
  destroy$:Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private actRouter: ActivatedRoute, private store: Store<ProductState>) {
    this.editProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', []],
      price: ["", [Validators.required]],
      stock: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.actRouter.paramMap.subscribe((params: ParamMap)=> {
      this.productId = Number(params.get('productId'));

      // get product from productId param first with back & then get it from store (in case we empty storage or directly came here)
      this.store.dispatch(loadOneProduct({productId: this.productId}));

      this.store.select(
        selectOneProduct({productId: this.productId})).pipe(
        takeUntil(this.destroy$)
      ).subscribe((product: Product) => {
        this.product = product;
        this.editProductForm.patchValue({
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          stock: this.product.stock,
        });
      });
    });

  }

  update() {
    const product: Update<Product> = {
      id: this.product.id,
      changes: {
        ...this.product,
        ...this.editProductForm.value
      }
    };

    this.store.dispatch(updateProduct({product}));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
