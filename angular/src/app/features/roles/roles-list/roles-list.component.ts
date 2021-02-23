import { Component, OnInit } from '@angular/core';
import {RolesService} from "../services/roles.service";
import {PermissionService} from "../services/permissions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PermissionCreateComponent} from "../permissions/permission-create/permission-create.component";
import {ToastrService} from "ngx-toastr";
import {Permission} from "../model/permission";

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  modalRef: any;
  roles: any;
  role: any;
  permissions = [];
  isBtnDisabled = true;

  constructor(private modalService: NgbModal, private roleService: RolesService,
              private permissionService: PermissionService,private toast: ToastrService) { }

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

  async openCreatePermission() {
    const modalRef = this.modalService.open(PermissionCreateComponent);
    const addedPermission = await modalRef.result || null;
    if (addedPermission !== null) {
      console.log(addedPermission);
      this.permissions.push(addedPermission);
    }
  }

  savePermissions() {
    const role = {
      ...this.role
    };
    console.log(role);
    this.roleService.update(role).subscribe(()=> {
      this.toast.success('Permission of role updated successfully');
    });

  }

  toggleToSelectPerm(e, perm: Permission) {
    if (e.target.checked) {
      perm.is_allowed = true;
      this.role.permissions.push(perm);
    }
    else {
      this.role.permissions = this.role.permissions.filter(item => item.name !== perm.name);
    }
    this.isBtnDisabled = false;
  }
}
