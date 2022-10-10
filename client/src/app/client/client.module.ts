import { ClientRoutingModule } from './client-routing.module';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { SwiperModule } from 'swiper/angular';
import { MassagesPageComponent } from './massages-page/massages-page.component';
import { MassageDetailComponent } from './massage-detail/massage-detail.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsDetailPageComponent } from './news-detail-page/news-detail-page.component';
import { MasseusePageComponent } from './masseuse-page/masseuse-page.component';
import { MasseuseDetailPageComponent } from './masseuse-detail-page/masseuse-detail-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    ClientRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    TranslateModule,
    SharedModule,
    QuillModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    MassagesPageComponent,
    MassageDetailComponent,
    NewsPageComponent,
    NewsDetailPageComponent,
    MasseusePageComponent,
    MasseuseDetailPageComponent,
    ProfilePageComponent,
    RegisterPageComponent,
    LoginPageComponent
  ]
})
export class ClientModule {

}
