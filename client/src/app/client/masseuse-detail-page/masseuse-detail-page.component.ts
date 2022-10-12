import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { UpdateLikedMasseusesDto } from 'src/app/core/dto/account/update-liked-masseuses.dto';
import { CreateMasseuseCommentDto } from 'src/app/core/dto/masseuse-comment/create-masseuse-comment.dto';
import { UpdateLikesDto } from 'src/app/core/dto/masseuse/update-likes.dto';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IAccount } from 'src/app/core/models/IAccount';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { IMasseuseComment } from 'src/app/core/models/IMasseuseComment';
import { AccountService } from 'src/app/core/services/account.service';
import { MasseuseService } from 'src/app/core/services/masseuse.service';
import { MasseuseCommentService } from 'src/app/core/services/masseuseComment.service';
import { MaterialService } from 'src/app/core/services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-masseuse-detail-page',
  templateUrl: './masseuse-detail-page.component.html',
  styleUrls: ['./masseuse-detail-page.component.scss']
})
export class MasseuseDetailPageComponent implements OnInit {

  isOpened: boolean;
  masseuse!: IAccount;
  email: string;
  isLoading: boolean;
  isLiked: boolean;
  apiUrl: string;
  rating: number;
  userId: string;

  form: FormGroup;
  comments: IMasseuseComment[];
  isWrite: boolean;

  get Comment() { return this.form.get('comment'); }

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private masseuseService: MasseuseService,
    private masseuseCommentService: MasseuseCommentService
  ) {
    this.isOpened = false;
    this.email = sessionStorage.getItem('email') ?? '';
    this.isLoading = false;
    this.isLiked = false;
    this.apiUrl = environment.apiUrl;
    this.rating = 0;
    this.userId = '';
    this.comments = [];
    this.isWrite = false;

    this.form = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getMasseuseById();

    this.accountService.findByEmail(this.email).subscribe((account: IAccount) => {
      this.userId = account._id!;

      for(let like of account.likedMasseuses!) {
        if(like === this.masseuse._id) {
          this.isLiked = true;
          break;
        }
      }
    });
  }

  openComments(): void {
    this.isOpened = !this.isOpened;
  }

  getMasseuseById(): void {
    this.isLoading = true;

    this.route.params
    .pipe(switchMap((params: Params) => {
      return this.accountService.findById(params['id']);
    })).subscribe((res: IAccount) => {
      this.masseuse = res;
      this.isLoading = false;
      this.rating = Math.round(res.rating);
      this.getMasseuseComments();
    });
  }

  like(): void {
    if(this.isLiked) {
      MaterialService.toast('This masseuse already liked!');
      return;
    }
    else {
      let updateLikedMasseusesDto: UpdateLikedMasseusesDto = new UpdateLikedMasseusesDto(this.masseuse._id!);
      this.accountService.updateLikedMasseuses(this.email, updateLikedMasseusesDto).subscribe((res: BaseResponse<IAccount>) => {
        MaterialService.toast(res.message);
      });

      let updateLikesDto: UpdateLikesDto = new UpdateLikesDto(this.masseuse.masseuseId?.likesCount! + 1);
      this.masseuseService.changeLike(this.masseuse.masseuseId?._id!, updateLikesDto).subscribe((res: BaseResponse<IMasseuse>) => {
        this.getMasseuseById();
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
      let dto: CreateMasseuseCommentDto = new CreateMasseuseCommentDto(this.userId, this.masseuse._id!, this.Comment?.value);
      console.log(dto);
      this.masseuseCommentService.create(dto).subscribe((res: BaseResponse<IMasseuseComment>) => {
        this.getMasseuseComments();
      });
    }
  }

  getMasseuseComments(): void {
    this.masseuseCommentService.findAll().subscribe((comments: IMasseuseComment[]) => {
      for(let comment of comments) {
        if(comment.masseuse === this.masseuse._id) {
          this.comments.push(comment);
        }

        if(comment.fromUser._id === this.userId) {
          this.isWrite = true;
        }
      }
    })
  }
}
