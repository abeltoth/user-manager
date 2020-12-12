import { TEST_USERS, SINGLE_TEST_USER } from './../test_utils/test_users';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from '../types';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should retrieve test users', () => {
    apiService.get('/users')
      .subscribe((userList: User[]) => {
        const randomUser = userList.find(user => user.id === 4);

        expect(userList).toBeTruthy('No users returned');
        expect(userList.length).toBe(10,  'incorrect number of users');
        expect(randomUser.name).toBe('Patricia Lebsack');
      });

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('GET');
    req.flush(TEST_USERS);
  });

  it('should add a test user', () => {
    const newUser: User = SINGLE_TEST_USER;
    apiService.post('/users', newUser)
      .subscribe((response) => {
        expect(response).toBeFalsy('Post response recieved');
      });

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(SINGLE_TEST_USER);
    req.flush(null);
  });

  it('should update a test user', () => {
    const newUser: User = SINGLE_TEST_USER;
    apiService.put('/users/11', newUser)
      .subscribe((user: User) => {
        expect(user).toBeTruthy('User update failed');
        expect(user.name).toBe('Test User');
      });

    const req = httpTestingController.expectOne('http://localhost:3000/users/11');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(SINGLE_TEST_USER);
  });

  it('should delete a test user', () => {
    apiService.delete('/users/11')
      .subscribe((response) => {
        expect(response).toBeFalsy('Delete response recieved');
      });

    const req = httpTestingController.expectOne('http://localhost:3000/users/11');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });

});
