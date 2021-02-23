import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {userFeatureKey, userReducer} from "./store/reducer/user.reducer";
import {SigninComponent} from "./components/signin/signin.component";
import {SignupComponent} from "./components/signup/signup.component";
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effect/user.effects';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {ToggleDirective} from "./directives/toggle.directive";
import {UserRoutingModule} from "./user-routing.module";
import { ProfileClientComponent } from './components/clients/profile-client/profile-client.component';
import {CommunModule} from "../commun/commun.module";
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SettingClientComponent } from './components/clients/setting-client/setting-client.component';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';

@NgModule({
  declarations: [SigninComponent, SignupComponent, ToggleDirective, ProfileClientComponent, DashboardComponent, SettingClientComponent, CreateUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects]),
    FormsModule,
    ReactiveFormsModule,
    CommunModule,
  ],
  providers: [UserService],
  bootstrap: [],
  exports: [SigninComponent, SignupComponent]
})
export class UserModule { }
