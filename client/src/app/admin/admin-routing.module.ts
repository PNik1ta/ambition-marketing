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
    { path: 'massages/:id', component: AdminMassagesDetailComponent}
  ]}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {

}
