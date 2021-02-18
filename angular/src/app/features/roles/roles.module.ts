import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RolesRoutingModule} from "./roles-routing.module";
import { HttpClientModule} from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommunModule} from "../commun/commun.module";
import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { PermissionCreateComponent } from './permissions/permission-create/permission-create.component';


@NgModule({
  declarations: [RolesListComponent, RoleCreateComponent, PermissionCreateComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommunModule
  ],
  providers: [],
  exports: [RolesListComponent]
})
export class RolesModule { }
