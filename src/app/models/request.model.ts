export interface Request {
  path: string,
  method: "POST" | "DELETE" | "PUT" | "GET",
  body?: any,
  query?: any,
  type?: string,
}
