import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasketFullComponent} from "./components/basket-full/basket-full.component";

const routes: Routes = [
  {
    path: '',
    component: BasketFullComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
