import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketFullComponent } from './components/basket-full/basket-full.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {CartRoutingModule} from "./cart-routing.module";
import {cartReducer} from "./store/reducer/cart.reducer";
import {CartEffects} from "./store/effect/cart.effects";
import {cartFeatureKey} from "./store/reducer/cart.reducer";


@NgModule({
  declarations: [BasketFullComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ]
})
export class CartModule { }
