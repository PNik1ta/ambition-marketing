import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MassagesPageComponent } from './massages-page/massages-page.component';
import { MassageDetailComponent } from './massage-detail/massage-detail.component';

const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
	    { path: '', component: HomePageComponent },
      { path: '', component: MassagesPageComponent },
      { path: 'Massages', component: MassagesPageComponent },
      { path: 'Massages/:id', component: MassageDetailComponent }
    ]}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientRoutingModule {

}
