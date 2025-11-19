// src/app/components/toast/toast.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  dismiss(id: string) {
    this.toastService.dismiss(id);
  }

  getIconClass(variant: string): string {
    switch (variant) {
      case 'success': return 'bi-check-circle-fill text-success';
      case 'destructive': return 'bi-x-circle-fill text-danger';
      case 'warning': return 'bi-exclamation-triangle-fill text-warning';
      case 'info': return 'bi-info-circle-fill text-info';
      default: return 'bi-info-circle-fill';
    }
  }

  getAlertClass(variant: string): string {
    switch (variant) {
      case 'success': return 'alert-success';
      case 'destructive': return 'alert-danger';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return 'alert-info';
    }
  }
}