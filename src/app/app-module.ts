// src/app/app-module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Root component
import { AppComponent } from './app';

// Routing
import { AppRoutingModule } from './app-routing-module';

// Standalone components
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { FeaturesComponent } from './components/features/features';
import { ScreenshotsComponent } from './components/screenshots/screenshots';
import { PricingComponent } from './components/pricing/pricing';
import { HowItWorksComponent } from './components/how-it-works/how-it-works';
import { TestimonialsComponent } from './components/testimonials/testimonials';
import { ContactComponent } from './components/contact/contact';
import { FaqComponent } from './components/faq/faq';
import { FooterComponent } from './components/footer/footer';
import { ToastComponent } from './components/toast/toast.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,

    // Standalone components
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    ScreenshotsComponent,
    PricingComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    ContactComponent,
    FaqComponent,
    FooterComponent,
    ToastComponent,
    CompaniesComponent,
    LoginComponent,
    UnauthorizedComponent
  ],

  providers: [
    DatePipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
