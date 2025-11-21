// 📁 src/app/components/hero/hero.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero {
  constructor(private router: Router) {}

  // ✅ UPDATED: Route to React login
  login(): void {
    window.location.href = `${environment.APP_URL}/login`;
  }

  // ✅ UPDATED: Route to React signup
  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}