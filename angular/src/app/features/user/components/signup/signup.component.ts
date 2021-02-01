import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {addUser} from "../../store/action/user.actions";
import {User} from "../../models/user";
import {UserState} from "../../store/reducer/user.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errMsg: string;

  constructor(private formBuilder: FormBuilder,
              private store: Store<UserState>, private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm = () => {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern(/[a-z0-9]{4,}/)]],
      firstname: ['', []],
      lastname: ['', []],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit = async () => {
    // todo choose username || email to connect or both ?
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const username = this.registerForm.get('username').value;
    const firstname = this.registerForm.get('firstname').value;
    const lastname = this.registerForm.get('lastname').value;

    const user: User = {
      email, password, username, firstname, lastname
    };

    this.store.dispatch(addUser({user}));
    this.modalService.dismissAll();
  }
}
