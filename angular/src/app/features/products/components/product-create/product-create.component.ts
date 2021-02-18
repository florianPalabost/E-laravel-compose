import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {ProductState} from "../../store/reducer/product.reducer";
import {Product} from "../../model/product";
import {Subject} from "rxjs";
import {addProduct} from "../../store/action/product.actions";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  product: Product;
  createProductForm: any;

  constructor(private fb: FormBuilder, private actRouter: ActivatedRoute, private store: Store<ProductState>) { }

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', []],
      price: ["", [Validators.required]],
      stock: ["", [Validators.required]],
    });

  }

  saveProduct() {
    const product: Product = {
      ...this.createProductForm.value
    };

    this.store.dispatch(addProduct({product}));
  }
}
