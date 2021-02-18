import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserState} from "./store/reducer/user.reducer";
import {Store} from "@ngrx/store";
import {getLoggedInUser, isUserLoaded} from "./store/selector/user.selectors";
import {map, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private store: Store<UserState>, private router: Router, private toast: ToastrService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getLoggedInUser).pipe(
    map((data) => {
      // not the right role
      if (data.isLogged && data.user.role !== 'ADMIN') {
        this.router.navigate(['/users/profile']);
        return false;
      }

      // not logged
      if (!data.isLogged || data.user.role !== 'ADMIN') {
        this.router.navigate(['/users/login']).then(() => this.toast.warning('You should be connected & have the proper role to be here !') );
        return false;
      }
      return data.isLogged;
    })
    );
  }

}
