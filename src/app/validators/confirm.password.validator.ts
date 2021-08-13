import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static confirmPassword(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      if(controls) {
        const control = controls.get(controlName);
        const checkControl = controls.get(checkControlName);

        if (checkControl && checkControl.errors && !checkControl.errors.confirmPasswordMatches) {
          return null;
        }

        if (checkControl && control && control.value !== checkControl.value) {
          checkControl.setErrors({ confirmPasswordMatches: true });
          return { confirmPasswordMatches: true };
        } else {
          return null;
        }
      }
      return null;
    };
  }
}
