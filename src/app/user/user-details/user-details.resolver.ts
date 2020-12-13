import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/types';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolver implements Resolve<User> {

  constructor(
    private apiService: ApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<User> {
    const id = route.params.id;
    if (id === 'new-user') {
      return of({} as User);
    } else {
      return this.apiService.get(`/users/${id}`);
    }
  }
}
