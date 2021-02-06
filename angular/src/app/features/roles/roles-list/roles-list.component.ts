import { Component, OnInit } from '@angular/core';
import {RolesService} from "../services/roles.service";
import {PermissionService} from "../services/permissions.service";

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  roles: any;
  role: any;
  permissions = [];
  constructor(private roleService: RolesService, private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.roleService.retrieveAll().subscribe(data => {
      this.roles = data.length > 0 ? data : [];
    });

    this.permissionService.retrieveAll().subscribe(data => {
      this.permissions = data.length > 0 ? data : [];
    });
  }

  handlePermissions(event) {
    this.role = this.roles.find((role) => role.name === event.target.value);

    this.permissions.forEach(perm => {
      perm.is_allowed = this.role.permissions.find(permRole => permRole.name === perm.name) !== undefined;
    });
  }
}
