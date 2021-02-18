import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from "./components/signin/signin.component";
import {SignupComponent} from "./components/signup/signup.component";
import {NotFoundComponent} from "../../layout/not-found/not-found.component";
import {AuthGuard} from "./auth.guard";
import {ProfileClientComponent} from "./components/clients/profile-client/profile-client.component";
import {RoleGuard} from "./role.guard";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {SettingClientComponent} from "./components/clients/setting-client/setting-client.component";

const routes: Routes = [
  {
    path: 'login',
    component: SigninComponent
  },
  {
    path: 'register',
    component:SignupComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileClientComponent
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingClientComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [RoleGuard],
    component: DashboardComponent
  },
  {
    path: '',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
