import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {userActionTypes} from "../action/user.actions";

import {UserService} from "../../services/user.service";
import {catchError, concatMap, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import * as storage from "../../../../root-store/storage";
import {of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/user";

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.loadUser),
      concatMap((action) => this.userService.signIn(action.user.email, action.user.password)),
      map((action:any) => {
          if (action.message) {
            return userActionTypes.loadUserFailure({error: action.message});
          }
          return userActionTypes.loadUserSuccess({user: new User(action.user)});
        }
      ),
      catchError(e =>  of(userActionTypes.loadUserFailure({error: e?.error?.message || e.message || e})))
    ),
  );

  loadUserSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userActionTypes.loadUserSuccess),
        tap( () => {
          this.router.navigate(['/']).then(
            () => this.toast.success('You have been successfully been connected !', 'Hello world!'));
        })
      ),
    { dispatch: false }
  );


  loadUserFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userActionTypes.loadUserFailure),
        tap( (action) =>  this.toast.error(action.error))
      ),
    { dispatch: false }
  );

  createUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActionTypes.addUser),
    concatMap((action) => this.userService.createUser(action.user)),
    map((action: any) => {
      return userActionTypes.addUserSuccess({user: action.user});
    })
  ));

  addUserSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userActionTypes.addUserSuccess),
        tap( () => {
          this.router.navigateByUrl('/').then(() => this.toast.success('You have been successfully been registered !', 'Hello world!'));
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.updateUser),
      concatMap((action) => this.userService.updateUser(action.user.id ,action.user.changes)),
      map((action: any) => {
        this.toast.success('Info updated successfully !');
        return userActionTypes.updateUserSuccess();
      })
    ));

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.logoutUser),
      tap(() => {
          storage.clearStorage();
          return this.router.navigate(['/']);
        }
      ),
      catchError(e => of(e)),
    ),

  { dispatch: false, useEffectsErrorHandler: true }
  );


  constructor(private actions$: Actions, private userService: UserService, private router: Router, private toast: ToastrService) {}

}
