import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`);
  }

  post(path: string, body: User): Observable<any> {
    return this.http.post(`${this.baseUrl}${path}`, body);
  }

  put(path: string, body: User): Observable<any> {
    return this.http.put(`${this.baseUrl}${path}`, body);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${path}`);
  }
}
