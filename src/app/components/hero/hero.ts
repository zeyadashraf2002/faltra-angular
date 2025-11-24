// 📁 src/app/components/hero/hero.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition(':enter', [
        animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)')
      ])
    ]),
    trigger('staggerItems', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('float', [
      state('*', style({ transform: 'translateY(0)' })),
      transition('* => *', [
        animate('3s ease-in-out', style({ transform: 'translateY(-10px)' })),
        animate('3s ease-in-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Hero implements OnInit {
  animationState = 'visible';
  particles: Array<{ x: number; y: number; size: number; delay: number }> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateParticles();
  }

  generateParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3
      });
    }
  }

  login(): void {
    window.location.href = `${environment.APP_URL}/login`;
  }

  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }

  scrollToFeatures(): void {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}