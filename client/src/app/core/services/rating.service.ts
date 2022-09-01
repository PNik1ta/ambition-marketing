import { IAccount } from './../models/IAccount';
import { BaseResponse } from './../models/BaseResponse';
import { Observable } from 'rxjs';
import { RateDto } from './../dto/rate.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class RatingService {
  constructor(
    private http: HttpClient
  ) {}

  rate(dto: RateDto): Observable<BaseResponse<IAccount>> {
    let url: string = '/api/rate';
    return this.http.post<BaseResponse<IAccount>>(url, dto);
  }
}
