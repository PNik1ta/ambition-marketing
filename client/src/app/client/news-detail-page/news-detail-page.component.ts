import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { UpdateLikedNewsDto } from 'src/app/core/dto/account/update-liked-news.dto';
import { CreateNewsCommentDto } from 'src/app/core/dto/news-comment/create-news-comment.dto';
import { UpdateLikesDto } from 'src/app/core/dto/news/update-likes.dto';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IAccount } from 'src/app/core/models/IAccount';
import { INews } from 'src/app/core/models/INews';
import { INewsComment } from 'src/app/core/models/INewsComment';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
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
  userId: string;

  form: FormGroup;

  comments: INewsComment[];

  isAuthenticated: boolean;

  isWrite: boolean;

  get Comment() { return this.form.get('comment'); }


  constructor(
    private newsService: NewsService,
    private newsCommentsService: NewsCommentService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private authService: AuthService
  ) {
    this.isOpened = false;
    this.isLoading = true;
    this.apiUrl = environment.apiUrl;
    this.email = localStorage.getItem('email') ?? '';
    this.isLiked = false;
    this.userId = '';
    this.comments = [];
    this.isWrite = false;
    this.isAuthenticated = false;

    this.form = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getNewsById();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.accountService.findByEmail(this.email).subscribe((account: IAccount) => {
      this.userId = account._id!;

      for(let like of account.likedNews!) {
        if(like === this.news._id) {
          this.isLiked = true;
          break;
        }
      }
    });
  }

  getNewsById(): void {
    this.isLoading = true;

    this.route.params
    .pipe(switchMap((params: Params) => {
      return this.newsService.findById(params['id']);
    })).subscribe((res: INews) => {
      this.news = res;
      this.isLoading = false;
      this.getNewsComments();
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
    if(!this.isAuthenticated) {
      MaterialService.toast('You must login for making likes');
      return;
    }
    else {
      let updateLikedNewsDto: UpdateLikedNewsDto = new UpdateLikedNewsDto(this.news._id!);
      this.accountService.updateLikedNews(this.email, updateLikedNewsDto).subscribe((res: BaseResponse<IAccount>) => {
        MaterialService.toast(res.message);
      });

      let updateLikesDto: UpdateLikesDto = new UpdateLikesDto(this.news.likesCount + 1);

      this.newsService.changeLike(this.news._id!, updateLikesDto).subscribe((res: BaseResponse<INews>) => {
        this.getNewsById();
      });
      this.isLiked = true;

    }
  }

  writeComment(): void {
    if(this.isWrite) {
      MaterialService.toast('You already wrote a comment');
      return;
    }

    if(this.form.valid) {
      let dto: CreateNewsCommentDto = new CreateNewsCommentDto(this.userId, this.news._id!, this.Comment?.value);
      this.newsCommentsService.create(dto).subscribe((res: BaseResponse<INewsComment>) => {
        this.getNewsComments();
      });
    }
  }

  getNewsComments(): void {
    this.newsCommentsService.findAll().subscribe((comments: INewsComment[]) => {
      for(let comment of comments) {
        if(comment.newsId === this.news._id) {
          this.comments.push(comment);
        }

        if(comment.fromUser._id === this.userId) {
          this.isWrite = true;
        }
      }
    })
  }

}
