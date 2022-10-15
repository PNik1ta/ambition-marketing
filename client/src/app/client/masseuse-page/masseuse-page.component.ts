import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/core/enums/Role';
import { IAccount } from 'src/app/core/models/IAccount';
import { IMasseuse } from 'src/app/core/models/IMasseuse';
import { AccountService } from 'src/app/core/services/account.service';
import { MasseuseService } from 'src/app/core/services/masseuse.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-masseuse-page',
  templateUrl: './masseuse-page.component.html',
  styleUrls: ['./masseuse-page.component.scss']
})
export class MasseusePageComponent implements OnInit {

  masseuses: IAccount[];
  apiUrl: string;
  isLoading: boolean;
  ratings: number[];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl;
    this.masseuses = [];
    this.isLoading = false;
    this.ratings = [];
  }

  ngOnInit(): void {
    this.getMasseuses();
  }

  getMasseuses(): void {
    this.isLoading = true;

    this.accountService.findAll().subscribe((accounts: IAccount[]) => {
      for (let account of accounts) {
        if(account.role === Role.MASSEUSE) {
          this.masseuses.push(account);
          let rating: number = Math.round(account.rating / account.ratesCount);
          this.ratings.push(rating);
        }
      }

      this.isLoading = false;
    })
  }

  showMore(masseuse: IAccount) {
    this.router.navigate(['Masseuses/' + masseuse._id])
  }

}
