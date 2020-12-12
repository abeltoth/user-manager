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

  get(path: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${path}`);
  }

  post(path: string, body: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}${path}`, body);
  }

  put(path: string, body: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}${path}`, body);
  }

  delete(path: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}${path}`);
  }
}
