import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static phone(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    if (/^\++(\d+[/\- ]?)+\d+$/.test(control.value)) {
      return null;
    }
    return { 'custom.phone': true };
  }
}

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}
