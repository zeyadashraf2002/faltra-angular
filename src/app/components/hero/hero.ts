// src/app/components/hero/hero.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  standalone: false,

  styleUrls: ['./hero.scss'],
})
export class Hero {
  constructor(private router: Router) {}

  login(): void {
    window.location.href = `${environment.APP_URL}/login`;
  }

  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}
