// 📁 src/app/components/navbar/navbar.ts - BODY SCROLL LOCK
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit, OnDestroy {
  private _mobileMenuOpen = false;

  constructor(private router: Router) {}

  // ✅ Getter/Setter with body scroll lock
  get mobileMenuOpen(): boolean {
    return this._mobileMenuOpen;
  }

  set mobileMenuOpen(value: boolean) {
    this._mobileMenuOpen = value;
    
    // ✅ Lock/unlock body scroll
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  ngOnInit(): void {
    this.setupScrollEffect();
    this.setupSmoothScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
    // ✅ Cleanup: restore scroll on destroy
    document.body.style.overflow = '';
  }

  private handleScroll = () => {
    const navbar = document.querySelector('nav.navbar');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };

  private setupScrollEffect(): void {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  private setupSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          const yOffset = -80;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          this.mobileMenuOpen = false;
        }
      });
    });
  }

  // ✅ Login redirects to React app
  login(): void {
    window.location.href = `${environment.APP_URL}/login`;
  }

  // ✅ Free trial redirects to React signup
  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}