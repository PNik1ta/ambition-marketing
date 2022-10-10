import { UpdateNewsDto } from './../dto/news/update-news.dto';
import { INews } from './../models/INews';
import { BaseResponse } from './../models/BaseResponse';
import { Observable } from 'rxjs';
import { CreateNewsDto } from './../dto/news/create-news.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UpdateLikesDto } from '../dto/news/update-likes.dto';

@Injectable({ providedIn: 'root'})
export class NewsService {
  constructor(
    private http: HttpClient
  ) {}

  create(dto: CreateNewsDto): Observable<BaseResponse<INews>> {
    let url: string = '/api/news';
    return this.http.post<BaseResponse<INews>>(url, dto);
  }

  findAll(): Observable<INews[]> {
    let url: string = '/api/news';
    return this.http.get<INews[]>(url);
  }

  findById(id: string): Observable<INews> {
    let url: string = '/api/news/' + id;
    return this.http.get<INews>(url);
  }

  delete(id: string): Observable<BaseResponse<INews>> {
    let url: string = '/api/news/' + id;
    return this.http.delete<BaseResponse<INews>>(url);
  }

  update(id: string, dto: UpdateNewsDto): Observable<BaseResponse<INews>> {
    let url: string = '/api/news/' + id;
    return this.http.patch<BaseResponse<INews>>(url, dto);
  }

  changeLike(id: string, dto: UpdateLikesDto): Observable<BaseResponse<INews>> {
    let url: string = '/api/news/change-like/' + id;
    return this.http.patch<BaseResponse<INews>>(url, dto);
  }
}
