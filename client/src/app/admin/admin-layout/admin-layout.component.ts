import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MaterialInstance, MaterialService } from 'src/app/core/services/material.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenavRef!: ElementRef;
	sidenav!: MaterialInstance;

	constructor(private router: Router, private authService: AuthService) { }

	ngAfterViewInit(): void {
		this.sidenav = MaterialService.initSideNav(this.sidenavRef);
	}

	exit() {
		MaterialService.toast('You logged out');
		this.authService.logout();
		this.router.navigate(['/admin']);
	}

	openSidenav(): void {
		this.sidenav.open!();
	}

}
