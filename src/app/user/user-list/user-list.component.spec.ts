import { SINGLE_TEST_USER } from './../../shared/test_utils/test_users';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync, flush } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from 'src/app/shared/test_utils/test_utils';
import { Router } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let el: DebugElement;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user if there is at least 1 user', () => {
    component.userList = [SINGLE_TEST_USER];
    fixture.detectChanges();
    const userListElement = el.query(By.css(".user-list-element"));

    expect(userListElement).toBeTruthy();
  });

  it('should display add button', () => {
    const addButton = el.query(By.css(".add-button"));

    expect(addButton).toBeTruthy();
  });

  it('should call navigate to details when user clicked', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.userList = [SINGLE_TEST_USER];
    component.userList[0].id = 250;
    fixture.detectChanges();

    const user = el.query(By.css(".user-name-text"));
    click(user);

    fixture.detectChanges();
    flush();

    expect(navigateSpy).toHaveBeenCalledWith('/users/250');
  }));

  it('should call navigate to new user when add button clicked', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const addButton = el.query(By.css(".add-button"));

    click(addButton);

    fixture.detectChanges();
    flush();

    expect(navigateSpy).toHaveBeenCalledWith('/users/new-user');
  }));
});
