import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/core/dto/login.dto';
import { IAccount } from 'src/app/core/models/IAccount';
import { ITokens } from 'src/app/core/models/ITokens';
import { AuthService } from 'src/app/core/services/auth.service';
import { MaterialService } from 'src/app/core/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  get Email() { return this.form.get('email'); }

  get Password() { return this.form.get('password'); }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
   }

  ngOnInit(): void {
  }

  login(): void {
    if(this.form.valid) {
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

}
