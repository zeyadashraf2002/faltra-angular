import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit, OnDestroy {
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setupScrollEffect();
    this.setupSmoothScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
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

  login(): void {
    window.location.href = `${environment.APP_URL}/login`;
  }

  freeTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }
}
