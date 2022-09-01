import { LoginDto } from './../dto/login.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from "rxjs";
import { RegisterDto } from "../dto/register.dto";
import { ITokens } from "../models/ITokens";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private jwtToken: string;
  private rt: string;

  constructor(private http: HttpClient) {
    this.jwtToken = '';
    this.rt = '';
  }

  register(dto: RegisterDto): Observable<ITokens> {
    let url: string = '/api/auth/register';
    return this.http.post<ITokens>(url, dto);
  }

  login(dto: LoginDto): Observable<ITokens> {
    let url: string = '/api/auth/login';
    return this.http.post<ITokens>(url, dto)
      .pipe(
        tap(
          (tokens) => {
            localStorage.setItem('auth-token', tokens.access_token);
            localStorage.setItem('rt-token', tokens.refresh_token);
            this.setToken(tokens.access_token, tokens.refresh_token);
          }
        )
      )
  }

  setToken(jwtToken: string, rt: string) {
    this.jwtToken = jwtToken;
    this.rt = rt;
  }

  getJwtToken(): string {
    return localStorage.getItem('auth-token') ?? '';
  }

  getRtToken(): string {
    return localStorage.getItem('rt-token') ?? '';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  logout(): void {
    this.setToken('', '');
    localStorage.clear();
  }

  refreshToken() {
    return this.http.post('/api/auth/refresh', {}, { headers: { 'Authorization': `Bearer ${this.getRtToken()}` } })
  }
}
