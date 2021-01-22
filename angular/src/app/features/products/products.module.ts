import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {ProductsRoutingModule} from "./products-routing.module";
import {HttpClient} from "@angular/common/http";
import {productFeatureKey, productReducer} from "./store/reducer/product.reducer";
import {ProductEffects} from "./store/effect/product.effects";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductsService} from "./services/products.service";


@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService],
  exports: [ProductListComponent, ProductDetailComponent]
})
export class ProductsModule { }
