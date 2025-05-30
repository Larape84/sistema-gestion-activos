import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatorPasswordMatch(pass: string, repeatPass: string): ValidatorFn {
  return (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const passwordControl = formGroup.controls[pass];
    const repeatPasswordControl = formGroup.controls[repeatPass];

    if (!passwordControl || !repeatPasswordControl) {
      return null;
    }

    if (repeatPasswordControl.errors && !repeatPasswordControl.errors['passwordMismatch']) {
      return null;
    }

    if (passwordControl.value !== repeatPasswordControl.value) {
      repeatPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      repeatPasswordControl.setErrors(null);
    }

    return null;
  };
}

export function validarUsuarioRegistrado(usersArray:string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const username = String(control.value)?.toLowerCase()?.trim();
      const userExists = usersArray.some(user => String(user)?.toLowerCase()?.trim() === username);
      return userExists ? { userExists: true } : null;
    }
}

export function ValidarSoloLetrasSinEspacio(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);
      const valid = /^[A-Za-z]+$/.test(value);
      return valid ? null : { onlyLetters: true };
    };
  }

  export function ValidarSoloLetrasConEspacio(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);
      const valid = /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(value);
      return valid ? null : { onlyLettersNoAccents: true };
    };
  }

  export function ValidarLetrasNumerosConEspacios(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);
      const valid = /^[A-Za-z0-9]+(\s[A-Za-z0-9]+)*$/.test(value);
      return valid ? null : { lettersNumbersNoDoubleSpaces: true };
    };
  }

  export function ValidarNumeros(minDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);
      const valid = new RegExp(`^[0-9]{${minDigits},}$`).test(value);
      return valid ? null : { minDigits: { requiredLength: minDigits, actualLength: value.length } };
    };
  }
