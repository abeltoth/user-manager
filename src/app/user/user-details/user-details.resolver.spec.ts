import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api.service';

import { UserDetailsResolver } from './user-details.resolver';

describe('UserDetailsResolver', () => {
  let resolver: UserDetailsResolver;

  beforeEach(() => {

    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    resolver = TestBed.inject(UserDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
