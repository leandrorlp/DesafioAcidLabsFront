import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private urlBase = environment.url;
  private timeOut = 120000;

  constructor(private http: HttpClient) {
  }

  public setTimeOut(time = this.timeOut) {
    this.timeOut = time;
  }

get<T>(port: number, url: string, params?: any): Observable<T> {
  const httpHeaders = new HttpHeaders().set('Accept', 'application/json');
  const responseType: any = 'json';
  const bodyRequest: any = {
    headers: httpHeaders,
    responseType: responseType
  };

  if (params) {
    bodyRequest['params'] = params;
  }

  return <any> this.http
  .get<T>(this.urlBase + url, bodyRequest)
  .pipe(
    timeout(this.timeOut),
    catchError(e => {
      return throwError('timeoutError');
    }));
}

put<T>(port: number, url: string, body: any): Observable<T> {
  const httpHeaders = new HttpHeaders().set(
    'content-type',
    'application/json'
  );

  return this.http
  .put<T>(this.urlBase + url, body, {
    headers: httpHeaders
  })
  .pipe(
    timeout(this.timeOut),
    catchError(e => {
      return throwError('timeoutError');
    }));
}

post<T>(port: number, url: string, body: any): Observable<T> {
  const httpHeaders = new HttpHeaders().set(
    'content-type',
    'application/json'
  );

  return this.http
  .post<T>(this.urlBase + url, body, {
    headers: httpHeaders
  })
  .pipe(
    timeout(this.timeOut),
    catchError(e => {
      return throwError('timeoutError');
    })
  );
}

delete<T>(port: number, url: string, params: any): Observable<T> {
  const httpHeaders = new HttpHeaders().set(
    'content-type',
    'application/json'
  );

  return this.http.delete<T>(this.urlBase + url, {
    params: params,
    headers: httpHeaders,
    responseType: 'json'
  });
}

}
