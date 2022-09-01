import { UpdateMassageDto } from './../dto/massage/update-massage.dto';
import { IMassage } from './../models/IMassage';
import { BaseResponse } from './../models/BaseResponse';
import { Observable } from 'rxjs';
import { CreateMassageDto } from './../dto/massage/create-massage.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class MassageService {
  constructor(
    private http: HttpClient
  ) {}

  create(dto: CreateMassageDto): Observable<BaseResponse<IMassage>> {
    let url: string = '/api/massages';
    return this.http.post<BaseResponse<IMassage>>(url, dto);
  }

  findAll(): Observable<IMassage[]> {
    let url: string = '/api/massages';
    return this.http.get<IMassage[]>(url);
  }

  findById(id: string): Observable<IMassage> {
    let url: string = '/api/massages/' + id;
    return this.http.get<IMassage>(url);
  }

  delete(id: string): Observable<BaseResponse<IMassage>> {
    let url: string = '/api/massages/' + id;
    return this.http.delete<BaseResponse<IMassage>>(url);
  }

  update(id: string, dto: UpdateMassageDto): Observable<BaseResponse<IMassage>> {
    let url: string = '/api/massages/' + id;
    return this.http.patch<BaseResponse<IMassage>>(url, dto);
  }
}
