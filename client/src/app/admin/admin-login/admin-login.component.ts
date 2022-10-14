import { MaterialInstance, MaterialService } from './../../core/services/material.service';
import { Role } from './../../core/enums/Role';
import { IAccount } from './../../core/models/IAccount';
import { AccountService } from './../../core/services/account.service';
import { Router } from '@angular/router';
import { ITokens } from './../../core/models/ITokens';
import { LoginDto } from './../../core/dto/login.dto';
import { AuthService } from './../../core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  form: FormGroup;

  get Email() { return this.form.get('email') }

  get Password() { return this.form.get('password') }
  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem("auth-token")) {
      this.router.navigate(['/admin/main/accounts']);
    }
  }

  login(): void {
    let dto: LoginDto = new LoginDto(this.Email?.value, this.Password?.value);

    this.authService.login(dto).subscribe((res: ITokens) => {
      const user: IAccount = jwt_decode(res.access_token);
      localStorage.setItem('email', this.Email?.value);

      if(user.role === Role.ADMIN) {
        this.router.navigate(['/admin/main/accounts']);
      }

      else {
        MaterialService.toast("Not accepted. Your role isn't admin");
        this.authService.logout();
      }
    }, () => {
      MaterialService.toast('Incorrect email or password');
    });

  }

}
