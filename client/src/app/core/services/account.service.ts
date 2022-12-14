import { UpdateAccountDto } from './../dto/account/update-account.dto';
import { RegisterDto } from './../dto/register.dto';
import { IAccount } from './../models/IAccount';
import { BaseResponse } from './../models/BaseResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UpdateLikedNewsDto } from '../dto/account/update-liked-news.dto';
import { UpdateLikedMasseusesDto } from '../dto/account/update-liked-masseuses.dto';
import { UpdateAvatarDto } from '../dto/account/update-avatar.dto';
import { UpdateRatingDto } from '../dto/account/update-rating.dto';
import { UpdateInformationDto } from '../dto/account/update-information.dto';

@Injectable({ providedIn: 'root'})
export class AccountService {
  constructor(
    private http: HttpClient
  ) {}

  create(dto: RegisterDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account';
    return this.http.post<BaseResponse<IAccount>>(url, dto);
  }

  findAll(): Observable<IAccount[]> {
    let url: string = '/api/account';
    return this.http.get<IAccount[]>(url);
  }

  findById(id: string): Observable<IAccount> {
    let url: string = '/api/account/' + id;
    return this.http.get<IAccount>(url);
  }

  findByEmail(email: string): Observable<IAccount> {
    let url: string = '/api/account/find-by-email/' + email;
    return this.http.get<IAccount>(url);
  }

  delete(email: string): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account/' + email;
    return this.http.delete<BaseResponse<IAccount>>(url);
  }

  update(id: string, dto: UpdateAccountDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account/' + id;
    return this.http.patch<BaseResponse<IAccount>>(url, dto);
  }

  updateLikedNews(email: string, dto: UpdateLikedNewsDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account/update-liked-news/' + email;
    return this.http.patch<BaseResponse<IAccount>>(url, dto);
  }

  updateLikedMasseuses(email: string, dto: UpdateLikedMasseusesDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account/update-liked-masseuses/' + email;
    return this.http.patch<BaseResponse<IAccount>>(url, dto);
  }

  updateAvatar(email: string, dto: UpdateAvatarDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account/update-avatar/' + email;
    return this.http.patch<BaseResponse<IAccount>>(url, dto);
  }

  updateRating(email: string, dto: UpdateRatingDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account/update-rating/' + email;
    return this.http.patch<BaseResponse<IAccount>>(url, dto);
  }

  updateInformation(email: string, dto: UpdateInformationDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/account/update-information/' + email;
    return this.http.patch<BaseResponse<IAccount>>(url, dto);
  }
}
