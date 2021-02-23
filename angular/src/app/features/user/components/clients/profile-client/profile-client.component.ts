import { Component, OnInit } from '@angular/core';
import * as fromRoot from "../../../store/reducer/user.reducer";
import {takeUntil} from "rxjs/operators";
import {AppState} from "../../../../products/store";
import {Store} from "@ngrx/store";
import {Subject} from "rxjs";

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.scss']
})
export class ProfileClientComponent implements OnInit {

  user: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(fromRoot.getLoginUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.user = data?.user;
    });
  }

}
