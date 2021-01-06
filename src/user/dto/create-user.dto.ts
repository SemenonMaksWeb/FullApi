export class CreateUserDto {
  login: string;
  password: string;
  email?: string;
}
export class CreateUserAdminDto {
  login: string;
  password: string;
  email?: string;
  isAdmin: boolean;
}