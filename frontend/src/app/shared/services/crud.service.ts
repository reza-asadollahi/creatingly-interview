import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

export abstract class CRUDService<T> {
  private readonly API_URL;
  private http: HttpClient = inject(HttpClient)

  constructor(baseUrl: string) {
    this.API_URL = `${environment.BASE_URL_API}/${baseUrl}`
  }

  getList() {
    return this.http.get<T[]>(this.API_URL);
  }

  create(entity: T) {
    return this.http.post<T>(this.API_URL, entity);
  }

  update(entity: T) {
    return this.http.patch<T>(this.API_URL, entity);
  }

  delete(entityId: string) {
    return this.http.delete<T>(`${this.API_URL}/${entityId}`);
  }

  getById(entityId: string) {
    return this.http.get<T>(`${this.API_URL}/${entityId}`);
  }
}
