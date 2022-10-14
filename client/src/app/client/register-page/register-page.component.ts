import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/core/dto/login.dto';
import { Role } from 'src/app/core/enums/Role';
import { ITokens } from 'src/app/core/models/ITokens';
import { AuthService } from 'src/app/core/services/auth.service';
import { MaterialService } from 'src/app/core/services/material.service';
import { RegisterDto } from '../../core/dto/register.dto';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup;

  get Email() { return this.form.get('email'); }

  get Password() { return this.form.get('password'); }

  get ConfirmPassword() { return this.form.get('confirmPassword'); }

  get Username() { return this.form.get('username'); }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      username: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    if(this.form.valid) {
      if(this.Password?.value !== this.ConfirmPassword?.value) {
        MaterialService.toast('Passwords mismatch');
        return;
      }
      let dto: RegisterDto = new RegisterDto(this.Email?.value, this.Password?.value, this.Username?.value, Role.USER);
      this.authService.register(dto).subscribe((res: ITokens) => {
        this.login();
      },
      () => {
        MaterialService.toast('This username already exists');
      });
    }

  }

  login(): void {
    let dto: LoginDto = new LoginDto(this.Email?.value, this.Password?.value);

    this.authService.login(dto).subscribe((res: ITokens) => {
      localStorage.setItem('email', this.Email?.value);
      this.router.navigate(['Profile']);
    },
    () => {
      MaterialService.toast("Incorrect data");
      this.authService.logout();
    });

  }

}
