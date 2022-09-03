import { IFileElementResponse } from './../models/IFileElement.response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(
    private http: HttpClient
  ) {}

  upload(image: File): Observable<IFileElementResponse[]> {
    const fd = new FormData();
    fd.append('image', image);
    let url: string = '/api/files/upload';
    return this.http.post<IFileElementResponse[]>(url, fd);
  }
}