import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

import { UserDetailsResolver } from './user-details.resolver';

describe('UserDetailsResolver', () => {
  let userDetailsResolver: UserDetailsResolver;
  let activatedRoute: ActivatedRoute;
  let apiService: ApiService;

  beforeEach(() => {

    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: {id: '10'} } }
        },
      ]
    });
    userDetailsResolver = TestBed.inject(UserDetailsResolver);
    activatedRoute = TestBed.inject(ActivatedRoute);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(userDetailsResolver).toBeTruthy();
  });

  it('should call /users/id if there is an id', () => {
    activatedRoute.snapshot.params.id = 2;
    userDetailsResolver.resolve(activatedRoute.snapshot);

    expect(apiService.get).toHaveBeenCalledWith('/users/2');
  });

  it('should not call apiService if id is "new-user"', () => {
    activatedRoute.snapshot.params.id = 'new-user';
    userDetailsResolver.resolve(activatedRoute.snapshot);

    expect(apiService.get).not.toHaveBeenCalled();
  });
});
