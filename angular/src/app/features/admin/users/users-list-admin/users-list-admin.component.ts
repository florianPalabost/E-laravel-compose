import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../user/services/user.service";
import {User} from "../../../user/models/user";
import {UserState} from "../../../user/store/reducer/user.reducer";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users-list-admin',
  templateUrl: './users-list-admin.component.html',
  styleUrls: ['./users-list-admin.component.scss']
})
export class UsersListAdminComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private store: Store<UserState>,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.userService.retrieveUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  remove(userId) {
    if (window.confirm('Are you sure to delete this user ?')) {
      this.userService.deleteUser(userId.toString()).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.toast.success('User successfully deleted');
      });
    }
  }
}
