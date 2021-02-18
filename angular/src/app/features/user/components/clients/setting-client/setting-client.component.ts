import { Component, OnInit } from '@angular/core';
import {AppState} from "../../../../products/store";
import {Store} from "@ngrx/store";
import {getLoggedInUser} from "../../../store/selector/user.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {User} from "../../../models/user";
import {FormBuilder, Validators} from "@angular/forms";
import {Update} from "@ngrx/entity";
import {updateUser} from "../../../store/action/user.actions";

@Component({
  selector: 'app-setting-client',
  templateUrl: './setting-client.component.html',
  styleUrls: ['./setting-client.component.scss']
})
export class SettingClientComponent implements OnInit {
  user: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userInfoForm: any;

  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userInfoForm = this.fb.group({
      email: [''],
      username: ['']
    });

    this.store.select(getLoggedInUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.user = data.user;
      this.userInfoForm.patchValue({
        email: this.user.email,
        username: this.user.username,
      })
    })
  }

  updateUser() {
    const user: Update<User> = {
      id: this.user.id,
      changes: {
        ...this.user,
        ...this.userInfoForm.value
      }
    };

    this.store.dispatch(updateUser({user}));

  }
}
