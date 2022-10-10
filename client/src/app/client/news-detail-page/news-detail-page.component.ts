import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { UpdateLikedNewsDto } from 'src/app/core/dto/account/update-liked-news.dto';
import { UpdateLikesDto } from 'src/app/core/dto/news/update-likes.dto';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IAccount } from 'src/app/core/models/IAccount';
import { INews } from 'src/app/core/models/INews';
import { AccountService } from 'src/app/core/services/account.service';
import { MaterialService } from 'src/app/core/services/material.service';
import { NewsService } from 'src/app/core/services/news.service';
import { NewsCommentService } from 'src/app/core/services/newsComment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-detail-page',
  templateUrl: './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.scss']
})
export class NewsDetailPageComponent implements OnInit {

  isOpened: boolean;
  news!: INews;
  isLoading: boolean;
  apiUrl: string;
  email: string;
  isLiked: boolean;


  constructor(
    private newsService: NewsService,
    private newsCommentsService: NewsCommentService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.isOpened = false;
    this.isLoading = true;
    this.apiUrl = environment.apiUrl;
    this.email = sessionStorage.getItem('email') ?? '';
    this.isLiked = false;
  }

  ngOnInit(): void {
    this.getNewsById();

    this.accountService.findByEmail(this.email).subscribe((account: IAccount) => {
      for(let like of account.likedNews!) {
        if(like === this.news._id) {
          this.isLiked = true;
          break;
        }
      }
    });
  }

  getNewsById(): void {
    this.route.params
    .pipe(switchMap((params: Params) => {
      return this.newsService.findById(params['id']);
    })).subscribe((res: INews) => {
      this.news = res;
      this.isLoading = false;
    });
  }

  openComments(): void {
    this.isOpened = !this.isOpened;
  }

  like(): void {
    if(this.isLiked) {
      MaterialService.toast('This news already liked!');
      return;
    }
    else {
      let updateLikedNewsDto: UpdateLikedNewsDto = new UpdateLikedNewsDto(this.news._id!);
      this.accountService.updateLikedNews(this.email, updateLikedNewsDto).subscribe((res: BaseResponse<IAccount>) => {
        MaterialService.toast(res.message);
      });

      let updateLikesDto: UpdateLikesDto = new UpdateLikesDto(this.news.likesCount + 1);
      console.log(updateLikesDto)
      this.newsService.changeLike(this.news._id!, updateLikesDto).subscribe((res: BaseResponse<INews>) => {
        this.getNewsById();
      });
      this.isLiked = true;

    }
  }

}
