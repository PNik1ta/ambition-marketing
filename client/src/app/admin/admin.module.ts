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
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminNewsAddComponent } from './admin-news-add/admin-news-add.component';
import { AdminNewsDetailComponent } from './admin-news-detail/admin-news-detail.component';
import { QuillModule } from 'ngx-quill';
import { AdminNewsEditComponent } from './admin-news-edit/admin-news-edit.component';
import { AdminMasseusesComponent } from './admin-masseuses/admin-masseuses.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    QuillModule.forRoot()
  ],
  exports: [
    QuillModule
  ],
  declarations: [
    AdminLayoutComponent,
    AdminAccountComponent,
    AdminLoginComponent,
    AdminMassagesComponent,
    AdminMassagesDetailComponent,
    AdminNewsComponent,
    AdminNewsAddComponent,
    AdminNewsDetailComponent,
    AdminNewsEditComponent,
    AdminMasseusesComponent
  ]
})
export class AdminModule {

}
