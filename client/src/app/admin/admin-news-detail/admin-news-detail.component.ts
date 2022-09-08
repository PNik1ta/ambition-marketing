import { ActivatedRoute, Params } from '@angular/router';
import { NewsService } from './../../core/services/news.service';
import { INews } from './../../core/models/INews';
import { Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-news-detail',
  templateUrl: './admin-news-detail.component.html',
  styleUrls: ['./admin-news-detail.component.scss']
})
export class AdminNewsDetailComponent implements OnInit {
  news$: Observable<INews>;
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {
    this.news$ = new Observable();
  }

  ngOnInit(): void {
    this.news$ = this.route.params
    .pipe(switchMap((params: Params) => {
      return this.newsService.findById(params['id']);
    }));
  }

}
