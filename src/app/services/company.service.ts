// src/app/services/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse, Company, UpdateSubscriptionRequest } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.API_URL}/companies`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<ApiResponse<Company[]>>(this.apiUrl, {
      withCredentials: true
    }).pipe(
      map(response => response.data || [])
    );
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<ApiResponse<Company>>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    }).pipe(
      map(response => response.data)
    );
  }

updateSubscription(id: number, data: UpdateSubscriptionRequest): Observable<Company> {
  return this.http.put<ApiResponse<Company>>(
    `${this.apiUrl}/${id}/subscription`,
    data,
    { withCredentials: true }
  ).pipe(
    map(response => response.data)
  );
}

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }
}