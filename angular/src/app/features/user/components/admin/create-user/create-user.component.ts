import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RolesService} from "../../../../roles/services/roles.service";
import {Role} from "../../../../roles/model/role";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  registerForm: FormGroup;
  errMsg: string;
  roles: Role[];

  constructor(private formBuilder: FormBuilder, private router: Router,
              private roleService: RolesService, private userService: UserService, private toast: ToastrService) { }

  ngOnInit(): void {
    // todo create a more simple fct retrieveRoles() to just retrieve roles names
    this.roleService.retrieveAll().subscribe((roles: Role[]) => {
      this.roles = roles;
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern(/[a-z0-9]{4,}/)]],
      firstname: ['', []],
      lastname: ['', []],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      role: ['', [Validators.required]]
    });

  }

  onSubmit() {
    const user: User = {...this.registerForm.value};
    this.userService.createUser(user).subscribe((data)=> {
      this.toast.success('User added successfully !');
    });
  }

}
