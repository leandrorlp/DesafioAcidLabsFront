/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { LoginRequest, Users } from "../../../models/comunes.model";
import { ContentType } from "../../../models/content-type.model";
import { Request } from "../../../models/request.model";
import { RequestsService } from "./requests.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  servicio = 0;

  constructor(private _handler: RequestsService) {}

  private request<T, K>(req: Request): Observable<T> {
    if (req.method === "GET") {
      let httpParams = new HttpParams();

      if (req.query) {
        for (let [key, value] of Object.entries(req.query)) {
          if (value != null) {
            httpParams = httpParams.set(key, String(value));
          }
        }
      }
      return this._handler.get<T>(this.servicio, req.path, httpParams);
    }

    if (req.method === "POST") {
      return this._handler.post<T>(this.servicio, req.path, req.body);
    }

    if (req.method === "PUT") {
      return this._handler.put<T>(this.servicio, req.path, req.body);
    }

    if (req.method === "DELETE") {
      let httpParams = new HttpParams();

      if (req.query) {
        for (let [key, value] of Object.entries(req.query)) {
          httpParams.set(key, String(value));
        }
      }
      return this._handler.delete<T>(this.servicio, req.path, httpParams);
    }

    return EMPTY;
  }

  authLoginCreate(data: LoginRequest) {
    return this.request<void, any>({
      path: `/api/Auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
    });
  }
  authRefreshList(query?: { refresh?: string }) {
    return this.request<void, any>({
      path: `/api/Auth/refresh`,
      method: "GET",
      query: query,
    });
  }
  usersList() {
    return this.request<void, any>({
      path: `/api/Users`,
      method: "GET",
    });
  }
  usersCreate(data: Users) {
    return this.request<void, any>({
      path: `/api/Users`,
      method: "POST",
      body: data,
      type: ContentType.Json,
    });
  }
  usersUpdate(query?: {
    Id?: string;
    Username?: string;
    Name?: string;
    RefreshToken?: string;
    Password?: string;
    Active?: boolean;
  }) {
    return this.request<void, any>({
      path: `/api/Users`,
      method: "PUT",
      query: query,
    });
  }
  usersDetail(id: string) {
    return this.request<Users, any>({
      path: `/api/Users/${id}`,
      method: "GET",
    });
  }
  usersDelete(id: string) {
    return this.request<void, any>({
      path: `/api/Users/${id}`,
      method: "DELETE",
    });
  }
}
