import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Role} from "../model/role";
import {RolesService} from "../services/roles.service";
import {PermissionService} from "../services/permissions.service";
import {Permission} from "../model/permission";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {

  formCreateRole: any;
  permissions: Permission[];

  constructor(private router: Router, private fb: FormBuilder, private roleService: RolesService, private permissionService :PermissionService) { }

  ngOnInit(): void {
    this.permissionService.retrieveAll().subscribe((data) => {
      this.permissions = data;
    });

    this.formCreateRole = this.fb.group({
      name: ['', Validators.required],
      permissionsSelected: this.fb.array([])
    });
  }

  onSubmit() {
    const role: Role = {...this.formCreateRole.value};
    role.name = role.name.toLocaleUpperCase();
    role.permissions = [];
    role.permissions = role["permissionsSelected"].map(item => {
      return {
        name: item
      }
    });

    this.roleService.add(role).subscribe(async data => {
      await this.router.navigate(['/roles']);
    });
  }

  selectAll() {

  }

  onCheckboxChange(e) {
    const permissionsSelected = this.formCreateRole.get('permissionsSelected') as FormArray;

    if (e.target.checked) {
      console.log('checked', e.target.checked);
      permissionsSelected.push(new FormControl(e.target.name));
    }
    else {
      let i = 0;
      permissionsSelected.controls.forEach((item :FormControl) => {
        if (item.value == e.target.name) {
          permissionsSelected.removeAt(i);
          return;
        }
        i++
      });
    }

    console.log('state permissions', permissionsSelected.value);
  }
}
