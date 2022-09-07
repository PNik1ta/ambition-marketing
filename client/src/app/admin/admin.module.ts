import { SharedModule } from './../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMassagesComponent } from './admin-massages/admin-massages.component';
import { AdminMassagesDetailComponent } from './admin-massages-detail/admin-massages-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminLayoutComponent,
    AdminAccountComponent,
    AdminLoginComponent,
    AdminMassagesComponent,
    AdminMassagesDetailComponent
  ]
})
export class AdminModule {

}
