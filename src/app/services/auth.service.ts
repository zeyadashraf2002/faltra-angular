// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  get isDeveloper(): boolean {
    return this.currentUser?.role === 'developer';
  }

  get isManager(): boolean {
    return this.currentUser?.role === 'manager';
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.API_URL}/users/logindev`,
      credentials,
      { withCredentials: true }
    ).pipe(
      tap(response => {
        if (response.success && response.data.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.data.user));
          this.currentUserSubject.next(response.data.user);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${environment.API_URL}/users/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }

  checkReactFrontendAvailable(): Promise<boolean> {
    return fetch(environment.APP_URL)
      .then(() => true)
      .catch(() => false);
  }
}