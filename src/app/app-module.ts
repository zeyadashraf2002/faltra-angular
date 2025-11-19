// 📁 src/app/app-module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Root component
import { AppComponent } from './app';

// Routing
import { AppRoutingModule } from './app-routing-module';

// Components (Standalone)
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Features } from './components/features/features';
import { Screenshots } from './components/screenshots/screenshots';
import { Pricing } from './components/pricing/pricing';
import { HowItWorks } from './components/how-it-works/how-it-works';
import { Testimonials } from './components/testimonials/testimonials';
import { Contact } from './components/contact/contact';
import { Faq } from './components/faq/faq';
import { Footer } from './components/footer/footer';

// Non-standalone components
import { ToastComponent } from './components/toast/toast.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    CompaniesComponent,
    LoginComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    
    // Standalone components
    Navbar,
    Hero,
    Features,
    Screenshots,
    Pricing,
    HowItWorks,
    Testimonials,
    Contact,
    Faq,
    Footer
  ],
  providers: [
    DatePipe,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}