import { UpdateMasseuseDto } from './../dto/masseuse/update-masseuse.dto';
import { IMasseuse } from './../models/IMasseuse';
import { BaseResponse } from './../models/BaseResponse';
import { Observable } from 'rxjs';
import { CreateMasseuseDto } from './../dto/masseuse/create-masseuse.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UpdateLikesDto } from '../dto/masseuse/update-likes.dto';

@Injectable({providedIn: 'root'})
export class MasseuseService {
    constructor(
      private http: HttpClient
    ) {}

    create(dto: CreateMasseuseDto): Observable<BaseResponse<IMasseuse>> {
      let url: string = '/api/masseuse';
      return this.http.post<BaseResponse<IMasseuse>>(url, dto);
    }

    findAll(): Observable<IMasseuse[]> {
      let url: string = '/api/masseuse';
      return this.http.get<IMasseuse[]>(url);
    }

    findById(id: string): Observable<IMasseuse> {
      let url: string = '/api/masseuse/' + id;
      return this.http.get<IMasseuse>(url);
    }

    delete(id: string): Observable<BaseResponse<IMasseuse>> {
      let url: string = '/api/masseuse/' + id;
      return this.http.delete<BaseResponse<IMasseuse>>(url);
    }

    update(id: string,dto: UpdateMasseuseDto): Observable<BaseResponse<IMasseuse>> {
      let url: string = '/api/masseuse/' + id;
      return this.http.patch<BaseResponse<IMasseuse>>(url, dto)
    }

    changeLike(id: string, dto: UpdateLikesDto): Observable<BaseResponse<IMasseuse>> {
      let url: string = '/api/masseuse/change-like/' + id;
      return this.http.patch<BaseResponse<IMasseuse>>(url, dto);
    }
}
