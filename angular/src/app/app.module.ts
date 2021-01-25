import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MenuComponent} from "./layout/menu/menu.component";
import {HomeComponent} from "./layout/home/home.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import { FooterComponent } from './layout/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './root-store/reducers';
import {ProductsModule} from "./features/products/products.module";
import {ProductEffects} from "./features/products/store/effect/product.effects";
import {EffectsModule} from "@ngrx/effects";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommunModule} from "./features/commun/commun.module";

@NgModule({
  declarations: [
    AppComponent, MenuComponent, HomeComponent, NotFoundComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers, runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([ProductEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveFormsModule,
    // add here features modules ...
    CommunModule,
    ProductsModule,

  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
