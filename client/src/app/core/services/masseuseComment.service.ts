import { UpdateMasseuseCommentDto } from './../dto/masseuse-comment/update-masseuse-comment.dto';
import { IMasseuseComment } from './../models/IMasseuseComment';
import { BaseResponse } from './../models/BaseResponse';
import { Observable } from 'rxjs';
import { CreateMasseuseCommentDto } from './../dto/masseuse-comment/create-masseuse-comment.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class MasseuseComment {
  constructor(
    private http: HttpClient
  ) {}

  create(dto: CreateMasseuseCommentDto): Observable<BaseResponse<IMasseuseComment>> {
    let url: string = '/api/masseuse-comments';
    return this.http.post<BaseResponse<IMasseuseComment>>(url, dto);
  }

  findAll(): Observable<IMasseuseComment[]> {
    let url: string = '/api/masseuse-comments';
    return this.http.get<IMasseuseComment[]>(url);
  }

  findById(id: string): Observable<IMasseuseComment> {
    let url: string = '/api/masseuse-comments/' + id;
    return this.http.get<IMasseuseComment>(url);
  }

  delete(id: string): Observable<BaseResponse<IMasseuseComment>> {
    let url: string = '/api/masseuse-comments/' + id;
    return this.http.delete<BaseResponse<IMasseuseComment>>(url);
  }

  update(id: string, dto: UpdateMasseuseCommentDto): Observable<BaseResponse<IMasseuseComment>> {
    let url: string = '/api/masseuse-comments/' + id;
    return this.http.patch<BaseResponse<IMasseuseComment>>(url, dto);
  }
}
