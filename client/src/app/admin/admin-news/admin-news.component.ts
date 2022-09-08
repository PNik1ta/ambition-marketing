import { MaterialService } from 'src/app/core/services/material.service';
import { BaseResponse } from './../../core/models/BaseResponse';
import { NewsService } from './../../core/services/news.service';
import { INews } from './../../core/models/INews';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  news$: Observable<INews[]>;

  constructor(
    private newsService: NewsService
  ) {
    this.news$ = new Observable();
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.news$ = this.newsService.findAll();
  }

  deleteNews(id: string): void {
    this.newsService.delete(id).subscribe((res: BaseResponse<INews>) => {
      MaterialService.toast(res.message);
      this.getNews();
    });
  }
}
