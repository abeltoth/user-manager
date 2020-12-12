import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListResolver } from './user-list/user-list.resolver';
import { UserDetailsResolver } from './user-details/user-details.resolver';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: {
      User: UserListResolver
    }
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    resolve: {
      User: UserDetailsResolver
    }
  },
  {
    path: '**',
    redirectTo: '',
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
