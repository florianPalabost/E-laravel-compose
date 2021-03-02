import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketFullComponent } from './components/basket-full/basket-full.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {BasketRoutingModule} from "./basket-routing.module";
import {basketFeatureKey, basketReducer} from "./store/reducer/basket.reducer";
import {BasketEffects} from "./store/effect/basket.effects";



@NgModule({
  declarations: [BasketFullComponent],
  imports: [
    CommonModule,
    BasketRoutingModule,
    StoreModule.forFeature(basketFeatureKey, basketReducer),
    EffectsModule.forFeature([BasketEffects]),
  ]
})
export class BasketModule { }
