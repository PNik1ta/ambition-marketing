import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isActive: boolean;
  isLogin: boolean;
  isAuthenticated: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.isActive = false;

    if(auth.isAuthenticated()) {
      this.isLogin = true;
    }

    else {
      this.isLogin = false;
    }
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  open(): void {
    this.isActive = !this.isActive;
  }

  logout(): void {
    this.auth.logout();
    this.isLogin = false;
    this.router.navigate(['Login']);
  }
}
