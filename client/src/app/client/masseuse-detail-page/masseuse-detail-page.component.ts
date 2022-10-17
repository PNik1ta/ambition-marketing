import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { UpdateLikedMasseusesDto } from 'src/app/core/dto/account/update-liked-masseuses.dto';
import { UpdateRatingDto } from 'src/app/core/dto/account/update-rating.dto';
import { CreateMasseuseCommentDto } from 'src/app/core/dto/masseuse-comment/create-masseuse-comment.dto';
import { UpdateLikesDto } from 'src/app/core/dto/masseuse/update-likes.dto';
import { RateDto } from 'src/app/core/dto/rate.dto';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IAccount } from 'src/app/core/models/IAccount';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { IMasseuseComment } from 'src/app/core/models/IMasseuseComment';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MasseuseService } from 'src/app/core/services/masseuse.service';
import { MasseuseCommentService } from 'src/app/core/services/masseuseComment.service';
import { MaterialInstance, MaterialService } from 'src/app/core/services/material.service';
import { RatingService } from 'src/app/core/services/rating.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-masseuse-detail-page',
  templateUrl: './masseuse-detail-page.component.html',
  styleUrls: ['./masseuse-detail-page.component.scss']
})
export class MasseuseDetailPageComponent implements OnInit, AfterViewInit {

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

  rateForm: FormGroup;

  @ViewChild('rateModal') rateModalRef!: ElementRef;
  @ViewChild('rateSelect') rateSelectRef!: ElementRef;

  rateModal!: MaterialInstance;
  rateSelect!: MaterialInstance;

  isRated: boolean;

  ratedUsers: string[];

  isAuthenticated: boolean;

  get Comment() { return this.form.get('comment'); }

  get Rating() { return this.rateForm.get('rating'); }

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private masseuseService: MasseuseService,
    private masseuseCommentService: MasseuseCommentService,
    private ratingService: RatingService,
    private authService: AuthService
  ) {
    this.isOpened = false;
    this.email = localStorage.getItem('email') ?? '';
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

    this.rateForm = new FormGroup({
      rating: new FormControl('', Validators.required)
    });

    this.isRated = false;
    this.ratedUsers = [];

    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.getMasseuseById();

    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngAfterViewInit(): void {
    this.rateModal = MaterialService.initModal(this.rateModalRef);
    this.rateSelect = MaterialService.initSelect(this.rateSelectRef);
  }

  openComments(): void {
    this.isOpened = !this.isOpened;
  }

  getAccountByEmail(): void {
    this.accountService.findByEmail(this.email).subscribe((account: IAccount) => {
      this.userId = account._id!;

      this.ratedUsers = account.ratedUsersId!;
      this.getIsRated();

      for(let like of account.likedMasseuses!) {
        if(like === this.masseuse._id) {
          this.isLiked = true;
          break;
        }
      }
    });
  }

  getMasseuseById(): void {
    this.isLoading = true;

    this.route.params
    .pipe(switchMap((params: Params) => {
      return this.accountService.findById(params['id']);
    })).subscribe((res: IAccount) => {
      this.masseuse = res;
      this.isLoading = false;
      this.rating = Math.round(res.rating / res.ratesCount);
      this.getAccountByEmail();
      this.getMasseuseComments();
    });
  }

  getIsRated(): void {
    for(let ratedUser of this.ratedUsers) {
      if(ratedUser === this.masseuse._id) {
        this.isRated = true;
        break;
      }
    }
  }

  like(): void {
    if(this.isLiked) {
      MaterialService.toast('This masseuse already liked!');
      return;
    }
    if(!this.isAuthenticated) {
      MaterialService.toast('You must login to make likes');
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

  rate(): void {

    let dto: RateDto = new RateDto(this.userId, this.masseuse._id!, parseInt(this.Rating?.value));

    this.ratingService.rate(dto).subscribe((res: BaseResponse<IAccount>) => {
      MaterialService.toast(res.message);
      this.getMasseuseById();
    })

    this.accountService.findByEmail(this.email).subscribe((account: IAccount) => {
      this.ratedUsers = account.ratedUsersId!;
      this.getIsRated();
    });
  }

  openRateModal(): void {
    if(this.isRated) {
      MaterialService.toast('You already rated this masseuse');
      return;
    }
    this.rateModal.open!();
  }

  closeRateModal(): void {
    this.rateModal.close!();
  }
}
