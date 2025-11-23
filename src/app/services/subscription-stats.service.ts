// 📁 src/app/services/subscription-stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SubscriptionStats {
  period: {
    month: number;
    year: number;
    monthName: string;
  };
  monthly: {
    revenue: number;
    invoicesCount: number;
  };
  yearly: {
    revenue: number;
    invoicesCount: number;
  };
  subscriptions: {
    active: number;
    expired: number;
    trial: number;
  };
  recent: Array<{
    id: number;
    status: string;
    startDate: string;
    endDate: string;
    company: {
      id: number;
      name: string;
      email: string;
    };
    plan: {
      id: number;
      name: string;
      nameAr: string;
      price: number;
    };
  }>;
}

export interface MonthlyRevenueReport {
  year: number;
  months: Array<{
    month: number;
    monthName: string;
    revenue: number;
    invoicesCount: number;
  }>;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionStatsService {
  private apiUrl = `${environment.API_URL}/subscriptions`;

  constructor(private http: HttpClient) {}

  /**
   * Get subscription statistics for a specific month/year
   */
  getStats(month?: number, year?: number): Observable<{ success: boolean; data: SubscriptionStats }> {
    let params = new HttpParams();
    
    if (month) {
      params = params.set('month', month.toString());
    }
    
    if (year) {
      params = params.set('year', year.toString());
    }

    return this.http.get<{ success: boolean; data: SubscriptionStats }>(
      `${this.apiUrl}/stats`,
      { params, withCredentials: true }
    );
  }

  /**
   * Get monthly revenue report for entire year
   */
  getMonthlyRevenue(year?: number): Observable<{ success: boolean; data: MonthlyRevenueReport }> {
    let params = new HttpParams();
    
    if (year) {
      params = params.set('year', year.toString());
    }

    return this.http.get<{ success: boolean; data: MonthlyRevenueReport }>(
      `${this.apiUrl}/revenue/monthly`,
      { params, withCredentials: true }
    );
  }
}