import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UpdateAvatarDto } from 'src/app/core/dto/account/update-avatar.dto';
import { Role } from 'src/app/core/enums/Role';
import { BaseResponse } from 'src/app/core/models/BaseResponse';
import { IAccount } from 'src/app/core/models/IAccount';
import { IFileElementResponse } from 'src/app/core/models/IFileElement.response';
import { IMassage } from 'src/app/core/models/IMassage';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { IMasseuseComment } from 'src/app/core/models/IMasseuseComment';
import { AccountService } from 'src/app/core/services/account.service';
import { FileService } from 'src/app/core/services/file.service';
import { MasseuseService } from 'src/app/core/services/masseuse.service';
import { MasseuseCommentService } from 'src/app/core/services/masseuseComment.service';
import { MaterialService } from 'src/app/core/services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  email: string;
  account!: IAccount;
  masseuseRole: string;
  isOpened: boolean;

  apiUrl: string;

  rating: number;

  isLoading: boolean;

  comments: IMasseuseComment[];

  accountComments: IMasseuseComment[];

  @ViewChild('input') inputRef!: ElementRef;
  image?: File;

  constructor(
    private accountService: AccountService,
    private masseuseCommentsService: MasseuseCommentService,
    private fileService: FileService
  ) {
    this.isOpened = false;
    this.email = sessionStorage.getItem('email')!;
    this.masseuseRole = Role.MASSEUSE;

    this.apiUrl = environment.apiUrl;

    this.rating = 0;

    this.isLoading = true;

    this.comments = [];

    this.accountComments = [];
  }

  ngOnInit(): void {
    this.getAccount();
    this.getMasseuseComments();
  }

  triggerClick(): void {
		this.inputRef.nativeElement.click();
	}

  onFileUpload(event: any): void {
		const file = event.target.files[0];
		this.image = file;

    this.fileService.upload(this.image!).subscribe((src: IFileElementResponse[]) => {
      let dto: UpdateAvatarDto = new UpdateAvatarDto(src[0].url);

      this.accountService.updateAvatar(this.email, dto).subscribe((res: BaseResponse<IAccount>) => {
        MaterialService.toast(res.message);
        this.getAccount();
      });
    })
	}

  getAccount(): void {
    this.accountService.findByEmail(this.email).subscribe((res: IAccount) => {
      this.account = res;
      this.isLoading = false;
      this.rating = Math.round(this.account.rating);
    });
  }

  getMasseuseComments(): void {
    this.masseuseCommentsService.findAll().subscribe((res: IMasseuseComment[]) => {
      this.comments = res;
      this.findMasseuseComments();
    });
  }

  findMasseuseComments(): void {
    for(let comment of this.comments) {
      if ( comment.masseuse === this.account.masseuseId?._id ) {
        this.accountComments.push(comment);
      }
    }
  }

  openComments(): void {
    this.isOpened = !this.isOpened;
  }

}
