import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private utilService: UtilService, private router: Router) {}
  canActivate(): boolean {
    if (this.utilService.validToken()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
