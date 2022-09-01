import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  refresh: boolean = false;

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getJwtToken()}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          if (error.status === 401 && !this.refresh) {
            this.refresh = true;
            localStorage.removeItem('auth-token');
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${this.auth.getRtToken()}`
              }
            });

            return this.auth.refreshToken().pipe(
              switchMap((res: any) => {
                localStorage.setItem('auth-token', res.access_token);
                this.auth.setToken(res.access_token, res.refresh_token);
                return next.handle(req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.access_token}`
                  }
                }));
              })
            )
          }
          this.refresh = false;
          return this.handleAuthError(error);
        }
      )
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      });
    }

    return throwError(error);
  }
}
