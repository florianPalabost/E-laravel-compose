import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleGuard} from "../user/role.guard";
import {DashboardComponent} from "../user/components/admin/dashboard/dashboard.component";
import {ProductListAdminComponent} from "./products/product-list-admin/product-list-admin.component";
import {ProductEditComponent} from "../products/components/product-edit/product-edit.component";
import {ProductCreateComponent} from "../products/components/product-create/product-create.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate:  [RoleGuard]
  },
  {
    path: 'products',
    component: ProductListAdminComponent,
    canActivate:  [RoleGuard]
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate:  [RoleGuard],
    pathMatch: 'full'
  },
  {
    path: 'products/edit/:productId',
    component: ProductEditComponent,
    canActivate:  [RoleGuard]
  },
  {
    path: 'roles',
    loadChildren: () => import('./../roles/roles.module').then(m => m.RolesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
