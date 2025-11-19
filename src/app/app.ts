// 📁 src/app/app.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = 'faltarah-landing';
  showLandingPage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Show landing page only on specific routes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Hide landing page on /login and /dashboard routes
      const isAuthRoute = event.url.includes('/login') || 
                         event.url.includes('/dashboard') ||
                         event.url.includes('/unauthorized');
      this.showLandingPage = !isAuthRoute;
    });
  }
}