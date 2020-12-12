import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  get(path: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${path}`);
  }
}
