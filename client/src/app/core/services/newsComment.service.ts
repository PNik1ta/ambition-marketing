import { UpdateNewsCommentDto } from './../dto/news-comment/update-news-comment.dto';
import { INewsComment } from './../models/INewsComment';
import { BaseResponse } from './../models/BaseResponse';
import { Observable } from 'rxjs';
import { CreateNewsCommentDto } from './../dto/news-comment/create-news-comment.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NewsCommentService {
  constructor(
    private http: HttpClient
  ) {}

  create(dto: CreateNewsCommentDto): Observable<BaseResponse<INewsComment>> {
    let url: string = '/api/news-comments';
    return this.http.post<BaseResponse<INewsComment>>(url, dto);
  }

  findAll(): Observable<INewsComment[]> {
    let url: string = '/api/news-comments';
    return this.http.get<INewsComment[]>(url);
  }

  findById(id: string): Observable<INewsComment> {
    let url: string = '/api/news-comments/' + id;
    return this.http.get<INewsComment>(url);
  }

  delete(id: string): Observable<BaseResponse<INewsComment>> {
    let url: string = '/api/news-comments/' + id;
    return this.http.delete<BaseResponse<INewsComment>>(url);
  }

  update(id: string, dto: UpdateNewsCommentDto): Observable<BaseResponse<INewsComment>> {
    let url: string = '/api/news-comments/' + id;
    return this.http.patch<BaseResponse<INewsComment>>(url, dto);
  }
}
