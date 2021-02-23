import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {UserState} from "../../features/user/store/reducer/user.reducer";
import {logoutUser} from "../../features/user/store/action/user.actions";
import {Logout} from "../../root-store/clearState";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import * as fromRoot from "../../features/user/store/reducer/user.reducer";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isLogged :boolean;
  role: string;
  user: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isNavCollapsed = true;

  constructor(private store: Store<UserState>, private toast: ToastrService) {
    this.store.select(fromRoot.getLoginUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.user = data?.user;
      this.role = data?.user.hasOwnProperty('role') ? data?.user['role'] : null;
      this.isLogged = data?.user.hasOwnProperty('isLogged') ? data?.user['isLogged'] : false;
    });
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  logout() {
    this.store.dispatch(logoutUser());
    // clear state for otther feature
    this.store.dispatch(new Logout());
    this.toast.success('Successfully Logout !');
  }


}
