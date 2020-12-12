import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api.service';

import { UserListResolver } from './user-list.resolver';

describe('UserListResolver', () => {
  let resolver: UserListResolver;

  beforeEach(() => {

    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    resolver = TestBed.inject(UserListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
