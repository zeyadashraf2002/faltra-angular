// 📁 src/app/components/hero/hero.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero {
  constructor(private router: Router) {}

  login(): void {
    this.router.navigate(['/login']);
  }

  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}