import { SINGLE_TEST_USER } from './../../shared/test_utils/test_users';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from 'src/app/shared/test_utils/test_utils';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let el: DebugElement;
  let router: any;
  let mockApiService: any;

  beforeEach(waitForAsync(() => {

    const activatedRouteStub = {
      data: of({ user: SINGLE_TEST_USER })
    }
    const routerSpy = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    mockApiService = {
      put: () => { },
      post: () => { },
      delete: () => { },
    }

    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: mockApiService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign user when route is resolved', () => {
    const user = SINGLE_TEST_USER;
    const id = user.id;
    delete user.id;

    expect(component.userForm.value).toEqual(user);
    expect(component.id).toBe(id);
  });

  it('should call put when save button clicked with id', fakeAsync(() => {
    component.id = 2;
    spyOn(mockApiService, 'put').and.returnValue(of(SINGLE_TEST_USER));
    fixture.detectChanges();

    const saveBtn = el.query(By.css(".save-button"));
    click(saveBtn);

    fixture.detectChanges();
    flush();

    expect(mockApiService.put).toHaveBeenCalled();
  }));

  it('should call post when save button clicked with no id', fakeAsync(() => {
    component.id = null;
    spyOn(mockApiService, 'post').and.returnValue(of(SINGLE_TEST_USER));
    fixture.detectChanges();

    const saveBtn = el.query(By.css(".save-button"));
    click(saveBtn);

    fixture.detectChanges();
    flush();

    expect(mockApiService.post).toHaveBeenCalled();
  }));

  it('should call delete when delete button clicked', fakeAsync(() => {
    component.id = 2;
    spyOn(mockApiService, 'delete').and.returnValue(of(null));
    fixture.detectChanges();

    const deleteBtn = el.query(By.css(".delete-button"));
    click(deleteBtn);

    fixture.detectChanges();
    flush();

    expect(mockApiService.delete).toHaveBeenCalled();
  }));

  it('should call navigate when cancel button clicked', fakeAsync(() => {
    const cancelBtn = el.query(By.css(".cancel-button"));
    click(cancelBtn);

    fixture.detectChanges();
    flush();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/users');
  }));

  it('should display all input fields', () => {
    const nameInput = el.query(By.css("#name"));
    const usernameInput = el.query(By.css("#username"));
    const emailInput = el.query(By.css("#email"));
    const streetInput = el.query(By.css("#street"));
    const suiteInput = el.query(By.css("#suite"));
    const cityInput = el.query(By.css("#city"));
    const zipcodeInput = el.query(By.css("#zipcode"));
    const latInput = el.query(By.css("#lat"));
    const lngInput = el.query(By.css("#lng"));
    const phoneInput = el.query(By.css("#phone"));
    const websiteInput = el.query(By.css("#website"));
    const companyNameInput = el.query(By.css("#company-name"));
    const companyCatchPhraseInput = el.query(By.css("#company-catch-phrase"));
    const companyBsInput = el.query(By.css("#company-bs"));

    expect(nameInput).toBeTruthy("Could not find name");
    expect(usernameInput).toBeTruthy("Could not find username");
    expect(emailInput).toBeTruthy("Could not find email");
    expect(streetInput).toBeTruthy("Could not find street");
    expect(suiteInput).toBeTruthy("Could not find suite");
    expect(cityInput).toBeTruthy("Could not find city");
    expect(zipcodeInput).toBeTruthy("Could not find zipcode");
    expect(latInput).toBeTruthy("Could not find lat");
    expect(lngInput).toBeTruthy("Could not find lng");
    expect(phoneInput).toBeTruthy("Could not find phone");
    expect(websiteInput).toBeTruthy("Could not find website");
    expect(companyNameInput).toBeTruthy("Could not find company name");
    expect(companyCatchPhraseInput).toBeTruthy("Could not find company catch phrase");
    expect(companyBsInput).toBeTruthy("Could not find company bs");

  });
});
