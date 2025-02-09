import { LoginReq } from "./LoginReq";

export class UserDto extends LoginReq{
  firstName: string;
  lastName: string;
  role: Role;

  /**
   *
   */
  constructor(firstName?: string, lastName?: string, role: Role = Role.user) {
    super();
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.role = role;
  }
}

export enum Role{
  user = "ROLE_USER",
  admin = "ROLE_ADMIN"
}