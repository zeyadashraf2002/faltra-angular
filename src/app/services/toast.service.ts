// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  title: string;
  description: string;
  variant: 'success' | 'destructive' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  
  private idCounter = 0;

  show(toast: Omit<Toast, 'id'>) {
    const id = `toast-${++this.idCounter}`;
    const newToast: Toast = { 
      ...toast, 
      id,
      duration: toast.duration || 3000 
    };
    
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, newToast]);

    // Auto dismiss
    setTimeout(() => this.dismiss(id), newToast.duration);
  }

  dismiss(id: string) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }

  success(title: string, description: string) {
    this.show({ title, description, variant: 'success' });
  }

  error(title: string, description: string) {
    this.show({ title, description, variant: 'destructive' });
  }

  warning(title: string, description: string) {
    this.show({ title, description, variant: 'warning' });
  }

  info(title: string, description: string) {
    this.show({ title, description, variant: 'info' });
  }
}