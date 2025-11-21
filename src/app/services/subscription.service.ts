// 📁 src/app/services/subscription.service.ts (FIXED)
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

interface SubscriptionStatus {
  company: {
    id: number;
    name: string;
    email: string;
  };
  status: 'active' | 'expired';
  currentSubscription: {
    id: number;
    status: string;
    startDate: string;
    endDate: string;
    plan: {
      id: number;
      name: string;
      nameAr: string;
      price: number;
      durationDays: number;
    };
  } | null;
  daysRemaining: number;
  expiryDate: string;
  subscriptionHistory: any[];
  invoices: Array<{
    id: number;
    planName: string;
    amount: number;
    durationDays: number;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
    paidAt: string | null;
  }>;
  unreadAlerts: any[];
  alertsHistory: any[];
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.API_URL}/subscriptions`;

  constructor(private http: HttpClient) {}

  /**
   * Get company subscription status
   * Developer can pass companyId, others get their own
   */
  getCompanyStatus(companyId?: number): Observable<ApiResponse<SubscriptionStatus>> {
    // ✅ Fix: Build HttpParams properly
    let params = new HttpParams();
    
    if (companyId !== undefined) {
      params = params.set('companyId', companyId.toString());
    }
    
    return this.http.get<ApiResponse<SubscriptionStatus>>(
      `${this.apiUrl}/status`,
      { 
        params,
        withCredentials: true 
      }
    );
  }

  /**
   * Get verification status (for redirects)
   */
  getVerificationStatus(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/verification-status`,
      { withCredentials: true }
    );
  }

  /**
   * Get all subscription plans
   */
  getPlans(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/plans`);
  }

  /**
   * Get plan by ID
   */
  getPlanById(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/plans/${id}`);
  }
}