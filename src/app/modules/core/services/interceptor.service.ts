import { HttpInterceptor, HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  catchError,
  take,
  filter,
  switchMap,
  finalize,
  timeout,
  tap
} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Observable, of, BehaviorSubject, throwError, from } from 'rxjs';
import { ToastrGlobalService } from "./toastr-global.service";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private TENANT_HEADER = 'Tenant';
  private refreshTokenInProgress = false;
  ultRefreshToken = '';
  timeOut = 30000;
  idUsuario = 1;
  contUnauthorized = 2;
  request: any;
  next: any;
  url: string = '';
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private http: HttpClient,
    private toastr: ToastrGlobalService,
    private api: ApiService,
    private router: Router
  ) {

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        this.toastr.success(event);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.toastr.error(err);
          throw new Error(err.message);
        }

        if (err && err.status === 403) {
          this.refreshTokenInProgress = false;
          this.navigateToLogin();
          throw new Error('Sesion cerrada');
        }

        if (err && err.status === 401) {
          const esperar = this.ultRefreshToken === localStorage.getItem('refresh-token');
          this.contUnauthorized --;

          if (this.refreshTokenInProgress || esperar || this.contUnauthorized < 1) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() =>
                next.handle(this.addAuthenticationToken(request))
              )
            );
          } else {
            this.refreshTokenInProgress = true;

            if (!localStorage.getItem('token')) {
              this.refreshTokenInProgress = false;
              this.navigateToLogin();
              throw new Error('Sesion cerrada');
            }

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            this.ultRefreshToken = localStorage.getItem('refresh-token') || '';

            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(request));
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => {
                this.refreshTokenInProgress = false;
                this.contUnauthorized = 2;
              })
            );
          }
        }

        this.toastr.error(err);
        throw new Error(err.message);
      }));
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const tenant = window.location.href.replace('http://', '').split('.')[0];
    const token = localStorage.getItem('token');

    return request.clone({
      headers: request.headers.set(
        this.TENANT_HEADER,
        tenant
      ).set(
        "Authorization",
        "Bearer " + token || ''
      )
    });
  }

  private navigateToLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.router.navigateByUrl('/login');
  }

  private refreshAccessToken(): Observable<any> {
    return this.api.authRefreshList({ refresh : localStorage.getItem('refresh-token') || ''}).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.Token);
          localStorage.setItem('refresh-token', res.RefreshToken);

          return of('algo');
        } else {
          return throwError('NotLogged');
        }
      }), catchError(err => {
        this.navigateToLogin;
        return throwError('Error autenticando');
      })
      );
  }

}
