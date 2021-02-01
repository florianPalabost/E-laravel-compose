import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from "./components/signin/signin.component";
import {SignupComponent} from "./components/signup/signup.component";
import {NotFoundComponent} from "../../layout/not-found/not-found.component";

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
    path: '',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
