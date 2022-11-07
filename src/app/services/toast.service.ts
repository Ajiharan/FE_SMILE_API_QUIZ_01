import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string, timer = 3000): void {
    this.messageService.clear();
    this.messageService.add({
      key: 's',
      sticky: true,
      severity: 'success',
      summary: message,
      closable: false,
    });
    setTimeout(() => {
      this.messageService.clear('s');
    }, timer);
  }
  showError(message: string, timer = 3000): void {
    this.messageService.clear();
    this.messageService.add({
      key: 'w',
      sticky: true,
      severity: 'error',
      summary: message,
      closable: false,
    });
    setTimeout(() => {
      this.messageService.clear('w');
    }, timer);
  }
}
