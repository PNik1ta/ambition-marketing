import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/core/enums/Role';
import { IAccount } from 'src/app/core/models/IAccount';
import { IMassage } from 'src/app/core/models/IMassage';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { IMasseuseComment } from 'src/app/core/models/IMasseuseComment';
import { AccountService } from 'src/app/core/services/account.service';
import { MasseuseService } from 'src/app/core/services/masseuse.service';
import { MasseuseCommentService } from 'src/app/core/services/masseuseComment.service';
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

  constructor(
    private accountService: AccountService,
    private masseuseCommentsService: MasseuseCommentService
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
