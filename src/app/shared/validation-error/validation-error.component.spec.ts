import { FormControl } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidationErrorComponent } from './validation-error.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ValidationErrorComponent', () => {
  let component: ValidationErrorComponent;
  let fixture: ComponentFixture<ValidationErrorComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationErrorComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ValidationErrorComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show required error', () => {
    component.control = new FormControl();
    component.control.markAsTouched();
    component.control.setErrors({ required: true });

    fixture.detectChanges();
    const errorMsg = el.query(By.css(".required-error"));

    expect(errorMsg).toBeTruthy("Required error message is not visible");
  });

  it('should show email error', () => {
    component.control = new FormControl();
    component.control.markAsTouched();
    component.control.setErrors({ email: true });

    fixture.detectChanges();
    const errorMsg = el.query(By.css(".email-error"));

    expect(errorMsg).toBeTruthy("Email error message is not visible");
  });

  it('should show min error', () => {
    component.control = new FormControl();
    component.control.markAsTouched();
    component.control.setErrors({ min: { min: 3, actual: 2 } });

    fixture.detectChanges();
    const errorMsg = el.query(By.css(".min-error"));

    expect(errorMsg).toBeTruthy("Min error message is not visible");
  });

  it('should show max error', () => {
    component.control = new FormControl();
    component.control.markAsTouched();
    component.control.setErrors({ max: { max: 15, actual: 16 } });

    fixture.detectChanges();
    const errorMsg = el.query(By.css(".max-error"));

    expect(errorMsg).toBeTruthy("Max error message is not visible");
  });

  it('should show maxlength error', () => {
    component.control = new FormControl();
    component.control.markAsTouched();
    component.control.setErrors({ maxlength: { requiredLength: 5, actualLength: 7 } });

    fixture.detectChanges();
    const errorMsg = el.query(By.css(".maxlength-error"));

    expect(errorMsg).toBeTruthy("Maxlength error message is not visible");
  });
});
