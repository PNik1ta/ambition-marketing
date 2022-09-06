import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AdminLoginComponent},
  { path: 'main', component: AdminLayoutComponent, children: [
    { path: 'accounts', component: AdminAccountComponent }
  ]}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {

}
