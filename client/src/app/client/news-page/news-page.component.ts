import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INews } from 'src/app/core/models/INews';
import { NewsService } from 'src/app/core/services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  news$: Observable<INews[]>;
  apiUrl: string;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {
    this.news$ = new Observable<INews[]>();
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.news$ = this.newsService.findAll();
  }

  showMore(news: INews) {
    this.router.navigate(['News/' + news._id])
  }

}
