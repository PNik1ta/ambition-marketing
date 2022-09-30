import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from "swiper/angular";
import SwiperCore from 'swiper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  @ViewChild('swiperNews', {static: false}) swiperNews!: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 200,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      1160: {
        slidesPerView: 2
      },
      1700: {
        slidesPerView: 3
      }
    },
  }

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  slideNext(): void {
    this.swiper.swiperRef.slideNext(300);
  }

  slidePrev(): void {
    this.swiper.swiperRef.slidePrev(300);
  }

  slideNewsNext(): void {
    this.swiperNews.swiperRef.slideNext(300);
  }

  slideNewsPrev(): void {
    this.swiperNews.swiperRef.slidePrev(300);
  }


}
