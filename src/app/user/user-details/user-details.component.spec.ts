import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let apiService: any;

  beforeEach(waitForAsync(() => {

    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['put', 'post', 'delete']);

    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [RouterTestingModule, SharedModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
