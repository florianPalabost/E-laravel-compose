import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PermissionService} from "../../services/permissions.service";
import {Permission} from "../../model/permission";
import {ToastrService} from "ngx-toastr";
import {of} from "rxjs";

@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.scss']
})
export class PermissionCreateComponent implements OnInit {
  formCreatePermission: any;

  constructor(private fb: FormBuilder, private modalService: NgbActiveModal,
              private permissionService: PermissionService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.formCreatePermission = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    const permission: Permission = {...this.formCreatePermission.value};
    permission.name = permission.name.toLocaleUpperCase();
    this.permissionService.add(permission).subscribe(() => {
      this.modalService.close(permission);
      this.toast.success('Permission correctly added');
    });

  }
}
