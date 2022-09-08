import { AdminNewsEditComponent } from './admin-news-edit/admin-news-edit.component';
import { AdminNewsDetailComponent } from './admin-news-detail/admin-news-detail.component';
import { AdminNewsAddComponent } from './admin-news-add/admin-news-add.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminMassagesDetailComponent } from './admin-massages-detail/admin-massages-detail.component';
import { AdminMassagesComponent } from './admin-massages/admin-massages.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AdminLoginComponent},
  { path: 'main', component: AdminLayoutComponent, children: [
    { path: 'accounts', component: AdminAccountComponent },
    { path: 'massages', component: AdminMassagesComponent },
    { path: 'massages/:id', component: AdminMassagesDetailComponent },
    { path: 'news', component: AdminNewsComponent },
    { path: 'news/add', component: AdminNewsAddComponent },
    { path: 'news/:id' , component: AdminNewsDetailComponent },
    { path: 'news/edit/:id', component: AdminNewsEditComponent }
  ]}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {

}
