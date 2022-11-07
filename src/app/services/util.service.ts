import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public cookieToken: string = 'token';
  constructor(private cookieService: CookieService) { }


  getHeaders(): any {
    let headers = new HttpHeaders();
    headers = headers.append('quiz', this.getToken());
    return { headers };
  }

  validToken(): boolean {
    return Boolean(this.cookieService.get(this.cookieToken));
  }

  getToken(): string {
    return this.cookieService.get(this.cookieToken);
  }

  removeToken(): void {
    this.cookieService.deleteAll();
  }

  validInput(control: AbstractControl | null): string | null {
    const formGroup = control?.parent?.controls;

    const controlName =
      Object.keys(formGroup!)?.find(
        (name) => control === control?.parent?.get(name)
      ) || null;

    if (!control?.errors) {
      return null;
    }
    if (!(control.invalid && (control.dirty || control.touched))) {
      return null;
    }
    if (control?.hasError('required')) {
      if (controlName === 'userName') {
        return '*UserName  is required';
      }
      if (controlName === 'password') {
        return '*Password  is required';
      }
      return '*Confirm Password  is required';
    }

    if (control?.hasError('invalidPassword')) {
      return "*Password didn't match";
    }
    return null;
  }
}
