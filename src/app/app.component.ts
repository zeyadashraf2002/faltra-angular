// 📁 src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import AOS from 'aos'; //  صح

// Import Standalone Components
import { ToastComponent } from './components/toast/toast.component';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Contact } from './components/contact/contact';
import { Features } from './components/features/features';
import { Screenshots } from './components/screenshots/screenshots';
import { Pricing } from './components/pricing/pricing';
import { HowItWorks } from './components/how-it-works/how-it-works';
import { Testimonials } from './components/testimonials/testimonials';
import { Faq } from './components/faq/faq';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastComponent,
    Navbar,
    Hero,
    Contact,
    Features,
    Screenshots,
    Pricing,
    HowItWorks,
    Testimonials,
    Faq,
    Footer,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly title = 'faltarah-landing';
  showLandingPage = true;

  constructor(private router: Router) {}

  ngOnInit() {
    //  Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const isAuthRoute = event.url.includes('/dev-login') || 
                         event.url.includes('/dashboard') ||
                         event.url.includes('/unauthorized');
      
      this.showLandingPage = !isAuthRoute;
      
      //  Refresh AOS on route change
      AOS.refresh();
    });
  }
}