// 📁 src/app/services/subscription.service.ts (FIXED)
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { SubscriptionStatus } from '../models/subscription-status.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = `${environment.API_URL}/subscriptions`;

  constructor(private http: HttpClient) {}

  getCompanyStatus(companyId?: number): Observable<ApiResponse<SubscriptionStatus>> {
    let params = new HttpParams();

    if (companyId !== undefined) {
      params = params.set('companyId', companyId.toString());
    }

    return this.http.get<ApiResponse<SubscriptionStatus>>(
      `${this.apiUrl}/status`,
      { params, withCredentials: true }
    );
  }

  getVerificationStatus(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/verification-status`,
      { withCredentials: true }
    );
  }

  getPlans(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/plans`);
  }

  getPlanById(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/plans/${id}`);
  }
}
