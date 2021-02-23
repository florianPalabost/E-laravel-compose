import { NgModule } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {AdminRoutingModule} from "./admin-routing.module";
import {ProductListAdminComponent} from "./products/product-list-admin/product-list-admin.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UsersListAdminComponent } from './users/users-list-admin/users-list-admin.component';


@NgModule({
  declarations: [ProductListAdminComponent, UsersListAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ProductListAdminComponent]
})
export class AdminModule { }
