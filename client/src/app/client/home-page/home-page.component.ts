import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from "swiper/angular";
import { NewsService } from 'src/app/core/services/news.service';
import { AccountService } from 'src/app/core/services/account.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAccount } from 'src/app/core/models/IAccount';
import { Role } from 'src/app/core/enums/Role';
import { INews } from 'src/app/core/models/INews';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

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

  masseuses: IAccount[];
  apiUrl: string;
  isLoading: boolean;
  ratings: number[];

  news: INews[];
  latestNews: INews[];

  constructor(
    private newsService: NewsService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl;
    this.masseuses = [];
    this.isLoading = false;
    this.ratings = [];

    this.news = [];
    this.latestNews = [];
  }

  ngOnInit(): void {
    this.getMasseuses();
    this.getNews();
  }

  getMasseuses(): void {
    this.isLoading = true;

    this.accountService.findAll().subscribe((accounts: IAccount[]) => {
      for (let account of accounts) {
        if(account.role === Role.MASSEUSE) {
          this.masseuses.push(account);
          let rating: number = Math.round(account.rating / account.ratesCount);
          this.ratings.push(rating);
        }
      }

      this.isLoading = false;
    })
  }

  getNews(): void {
    this.isLoading = true;

    this.newsService.findAll().subscribe((news: INews[]) => {
      this.news = news;
      this.latestNews = this.latestNews.concat(this.news.slice(this.news.length - 5, this.news.length));
    })
  }

  showMoreMasseuse(masseuse: IAccount) {
    this.router.navigate(['Masseuses/' + masseuse._id])
  }

  showMoreNews(news: INews) {
    this.router.navigate(['News/' + news._id])
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
