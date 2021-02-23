import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesListComponent} from "./roles-list/roles-list.component";
import {RoleGuard} from "../user/role.guard";
import {RoleCreateComponent} from "./role-create/role-create.component";

const routes: Routes = [
  {
    path: '',
    component: RolesListComponent,
    canActivate:  [RoleGuard]
  },
  {
    path: 'create',
    component: RoleCreateComponent,
    canActivate:  [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
