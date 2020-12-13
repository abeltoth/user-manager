import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

import { UserListResolver } from './user-list.resolver';

describe('UserListResolver', () => {
  let userListResolver: UserListResolver;
  let activatedRoute: ActivatedRoute;
  let apiService: ApiService;

  beforeEach(() => {

    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '10' } } }
        },
      ]
    });
    userListResolver = TestBed.inject(UserListResolver);
    activatedRoute = TestBed.inject(ActivatedRoute);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(userListResolver).toBeTruthy();
  });

  it('should call get /users', () => {
    userListResolver.resolve(activatedRoute.snapshot);

    expect(apiService.get).toHaveBeenCalledWith('/users');
  });
});
