export class RegisterDto {
  email: string;
  password: string;
  username: string;
  role?: string;
  masseuseId?: string;

  constructor(email: string, password: string, username: string, role?: string, masseuseId?: string) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.role = role;
    this.masseuseId = masseuseId;
  }
}
