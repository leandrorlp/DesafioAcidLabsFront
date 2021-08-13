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

export interface LoginRequest {
  username?: string | null;
  password?: string | null;
}

export interface LoginResponse {
  token?: string | null;
  refreshToken?: string | null;
}

export interface Users {
  /** @format uuid */
  id?: string | null;
  username?: string | null;
  name?: string | null;
  refreshToken?: string | null;
  password?: string | null;
  active?: boolean;
}
