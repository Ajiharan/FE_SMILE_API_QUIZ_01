import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl: string = environment.server;
  private smileAPIUrl: string = 'https://marcconrad.com/uob/smile/api.php';
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private cookieService: CookieService,
    private utilService: UtilService
  ) {}

  create(data: any, func?: (response: boolean) => void): void {
    this.http.post(`${this.baseUrl}/user/register`, data).subscribe({
      next: (data) => {
        console.log('data', data);
        this.toastService.showSuccess('Account successfully created');
        func?.(true);
      },
      error: (err) => {
        console.log('err', err);
        this.toastService.showError(err.error);

        func?.(false);
      },
    });
  }

  login(data: any, func?: (response: boolean) => void): void {
    this.http.post(`${this.baseUrl}/user/login`, data).subscribe({
      next: (data) => {
        this.cookieService.set(
          this.utilService.cookieToken,
          data.toString(),
          2
        );
        this.toastService.showSuccess('Login Successfully');

        func?.(true);
      },
      error: (err) => {
        this.toastService.showError(err.error);

        func?.(false);
      },
    });
  }

  getHighScore(func: (data: any) => void, path = 'board/scores'): void {
    this.http
      .get(`${this.baseUrl}/${path}`, this.utilService.getHeaders())
      .subscribe({
        next: (data) => {
          func(data);
        },
        error: (err) => {
          console.log('err', err.error);
        },
      });
  }

  getQuestion(func?: (data: any) => void): void {
    this.http.get(this.smileAPIUrl).subscribe({
      next: (data) => {
        func?.(data);
      },
      error: (err) => {
        this.toastService.showError('cannot fetch question from smile api');
      },
    });
  }

  addScore(data: any, func?: (data?: any) => void) {
    this.http
      .post(
        `${this.baseUrl}/score/addScore`,
        data,
        this.utilService.getHeaders()
      )
      .subscribe({
        next: (data) => {
          func?.(data);
        },
        error: (err) => {
          this.toastService.showError(err);
        },
      });
  }

  getUserData(func: (response: any) => void): void {
    this.http
      .get(`${this.baseUrl}/user/detail`, this.utilService.getHeaders())
      .subscribe({
        next: (data: any) => {
          // console.log('data', data);
          func(data);
        },
        error: (err) => {
          this.toastService.showError(err.error);
        },
      });
  }
}
