import { createAction, props } from '@ngrx/store';
import {User} from "../../models/user";
import {Update} from "@ngrx/entity";

export const loadUser = createAction(
  '[User] Load User',
  props<{user: any}>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[User] Add User',
  props<{user: User}>()
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{user: Update<User>}>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  // props<{ user: User }>()
);

export const logoutUser = createAction(
  '[User] Logout User'
);


export const userActionTypes = {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  addUser,
  addUserSuccess,
  logoutUser,
  updateUser,
  updateUserSuccess
};
