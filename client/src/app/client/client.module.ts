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

@NgModule({
  imports: [
    ClientRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    MassagesPageComponent,
    MassageDetailComponent,
    NewsPageComponent,
    NewsDetailPageComponent
  ]
})
export class ClientModule {

}
