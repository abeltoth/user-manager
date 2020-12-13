import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/types';

@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<User[]> {

  constructor(
    private apiService: ApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<User[]> {
    return this.apiService.get('/users');
  }
}
