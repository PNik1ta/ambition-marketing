import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { UpdateLikedMasseusesDto } from 'src/app/core/dto/account/update-liked-masseuses.dto';
import { UpdateLikesDto } from 'src/app/core/dto/masseuse/update-likes.dto';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IAccount } from 'src/app/core/models/IAccount';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { AccountService } from 'src/app/core/services/account.service';
import { MasseuseService } from 'src/app/core/services/masseuse.service';
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

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private masseuseService: MasseuseService
  ) {
    this.isOpened = false;
    this.email = sessionStorage.getItem('email') ?? '';
    this.isLoading = false;
    this.isLiked = false;
    this.apiUrl = environment.apiUrl;
    this.rating = 0;
  }

  ngOnInit(): void {
    this.getMasseuseById();

    this.accountService.findByEmail(this.email).subscribe((account: IAccount) => {
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
}
