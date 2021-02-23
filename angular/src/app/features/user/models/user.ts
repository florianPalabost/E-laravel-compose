export class User {
  constructor(user: object) {
    this.email = user.hasOwnProperty('email') ? user['email']:null;
    this.password = user.hasOwnProperty('password') ? user['password']:null;
    this.username = user.hasOwnProperty('username') ? user['username']:null;
    this.id = user.hasOwnProperty('id') ? user['id']:null;
    this.accessToken = user.hasOwnProperty('accessToken') ? user['accessToken']:null;
    this.refreshToken = user.hasOwnProperty('refreshToken') ? user['refreshToken']:null;
    this.firstname = user.hasOwnProperty('firstname') ? user['firstname']:null;
    this.lastname = user.hasOwnProperty('lastname') ? user['lastname']:null;
    this.role = user.hasOwnProperty('rolename') ? user['rolename']:null;
  }

  id?: string;
  email?: string;
  username?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  firstname?: string;
  lastname?: string;
  role?: any;
}
