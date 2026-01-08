# 🚀 Faltarah - Landing Page & Admin Portal

<div align="center">

![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A stunning, animated landing page with admin dashboard for business management**

*Built with Angular 20, Bootstrap 5, AOS animations, and modern design patterns*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Project Structure](#-project-structure)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Routes & Navigation](#-routes--navigation)
- [Services](#-services)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 Overview

**Faltarah Landing Page** is a modern, responsive marketing website and admin portal for the Faltarah business management system. It provides:

- 🎨 **Beautiful landing page** with smooth scroll animations
- 💼 **Product showcase** with features and screenshots
- 💰 **Pricing plans** with subscription tiers
- 📧 **Contact form** with EmailJS integration
- 🔐 **Developer portal** for admin management
- 📊 **Subscription dashboard** with analytics charts
- 🏢 **Company management** for multi-tenant administration

---

## ✨ Features

### 🎨 Landing Page Sections

| Section | Description |
|---------|-------------|
| **Hero** | Eye-catching hero section with call-to-action |
| **Features** | Product features showcase with icons |
| **How It Works** | Step-by-step guide for users |
| **Screenshots** | Product screenshots gallery |
| **Pricing** | Subscription plans with pricing cards |
| **Testimonials** | Customer reviews and testimonials |
| **FAQ** | Frequently asked questions accordion |
| **Contact** | Contact form with email integration |
| **Footer** | Site links and company information |

### 🎬 Animations & Effects
- **AOS (Animate On Scroll)** - Smooth scroll-triggered animations
- **CSS Transitions** - Hover effects and micro-interactions
- **Responsive Design** - Mobile-first responsive layout
- **Parallax Effects** - Depth and visual interest

### 🔐 Admin Dashboard

| Feature | Description |
|---------|-------------|
| **Developer Login** | Secure authentication for admins |
| **Companies Management** | View and manage all companies |
| **Company Details** | Detailed company information |
| **Subscription Dashboard** | Analytics and subscription stats |
| **Route Guards** | Protected routes with AuthGuard |

### 📊 Analytics & Charts
- **ngx-charts** integration for data visualization
- Subscription statistics and trends
- Revenue metrics and charts
- Company growth analytics

### 📧 Contact Integration
- **EmailJS** integration for contact form
- No backend required for email sending
- Form validation and feedback
- Toast notifications for user feedback

---

## 🛠 Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 20.x | Frontend framework |
| TypeScript | 5.9 | Type-safe JavaScript |
| RxJS | 7.8 | Reactive programming |
| Zone.js | 0.15 | Change detection |

### UI & Styling
| Package | Purpose |
|---------|---------|
| `Bootstrap 5` | CSS framework & grid system |
| `Bootstrap Icons` | Icon library |
| `SCSS` | CSS preprocessor |
| `AOS` | Animate On Scroll library |
| `Inter Font` | Modern typography |

### Data Visualization
| Package | Purpose |
|---------|---------|
| `@swimlane/ngx-charts` | Angular charts library |
| `chart.js` | Chart rendering engine |

### Email Integration
| Package | Purpose |
|---------|---------|
| `@emailjs/browser` | Client-side email sending |

### Development
| Package | Purpose |
|---------|---------|
| `@angular/cli` | Angular CLI tools |
| `Karma` | Test runner |
| `Jasmine` | Testing framework |
| `Prettier` | Code formatting |

---

## 🚀 Installation

### Prerequisites

```bash
# Required software
- Node.js v18+
- npm or yarn
- Angular CLI
- Git
```

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/faltarah-landing.git
cd faltarah-landing
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

```bash
# Edit environment files
src/environments/environment.ts        # Development
src/environments/environment.prod.ts   # Production
```

### Step 4: Start Development Server

```bash
ng serve
# or
npm start
```

The app will be available at `http://localhost:4200`

### Step 5: Build for Production

```bash
ng build
# or
npm run build
```

Production files will be in the `dist/` folder.

---

## 🔧 Environment Variables

Configure the environment files in `src/environments/`:

**environment.ts (Development)**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  emailJs: {
    serviceId: 'your_service_id',
    templateId: 'your_template_id',
    publicKey: 'your_public_key'
  }
};
```

**environment.prod.ts (Production)**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourapp.com/api',
  emailJs: {
    serviceId: 'your_service_id',
    templateId: 'your_template_id',
    publicKey: 'your_public_key'
  }
};
```

---

## 📁 Project Structure

```
faltarah-landing/
├── src/
│   ├── main.ts                    # Bootstrap entry
│   ├── index.html                 # HTML template
│   ├── styles.scss                # Global styles
│   │
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.component.html     # Root template
│   │   ├── app.component.scss     # Root styles
│   │   ├── app.config.ts          # App configuration
│   │   ├── app.routes.ts          # Route definitions
│   │   │
│   │   ├── components/            # Feature components
│   │   │   ├── navbar/           # Navigation bar
│   │   │   ├── hero/             # Hero section
│   │   │   ├── features/         # Features showcase
│   │   │   ├── how-it-works/     # How it works section
│   │   │   ├── screenshots/      # Screenshots gallery
│   │   │   ├── pricing/          # Pricing plans
│   │   │   ├── testimonials/     # Customer testimonials
│   │   │   ├── faq/              # FAQ accordion
│   │   │   ├── contact/          # Contact form
│   │   │   ├── footer/           # Footer section
│   │   │   ├── toast/            # Toast notifications
│   │   │   │
│   │   │   ├── login-dev/        # Developer login
│   │   │   ├── unauthorized/     # Unauthorized page
│   │   │   ├── companies/        # Companies list
│   │   │   ├── company-details/  # Company details
│   │   │   └── subscription-dashboard/  # Sub dashboard
│   │   │
│   │   ├── services/              # Angular services
│   │   │   ├── auth.service.ts   # Authentication
│   │   │   ├── company.service.ts # Company API
│   │   │   ├── subscription.service.ts # Subscriptions
│   │   │   ├── subscription-stats.service.ts # Stats
│   │   │   └── toast.service.ts  # Notifications
│   │   │
│   │   ├── guards/                # Route guards
│   │   │   └── auth.guard.ts     # Auth & Developer guards
│   │   │
│   │   ├── interceptors/          # HTTP interceptors
│   │   │   └── ...
│   │   │
│   │   ├── models/                # TypeScript interfaces
│   │   │   └── ...
│   │   │
│   │   └── pipes/                 # Custom pipes
│   │       └── ...
│   │
│   ├── assets/                    # Static assets
│   │   └── logo.png
│   │
│   └── environments/              # Environment configs
│       ├── environment.ts
│       └── environment.prod.ts
│
├── angular.json                   # Angular configuration
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
├── vercel.json                    # Vercel deployment
└── README.md
```

---

## 🧩 Components

### Landing Page Components

| Component | Path | Description |
|-----------|------|-------------|
| `NavbarComponent` | `/components/navbar` | Responsive navigation with smooth scroll |
| `HeroComponent` | `/components/hero` | Hero section with CTA buttons |
| `FeaturesComponent` | `/components/features` | Product features grid |
| `HowItWorksComponent` | `/components/how-it-works` | Step-by-step process |
| `ScreenshotsComponent` | `/components/screenshots` | Product screenshots carousel |
| `PricingComponent` | `/components/pricing` | Subscription pricing cards |
| `TestimonialsComponent` | `/components/testimonials` | Customer reviews slider |
| `FaqComponent` | `/components/faq` | FAQ accordion |
| `ContactComponent` | `/components/contact` | Contact form with EmailJS |
| `FooterComponent` | `/components/footer` | Site footer with links |
| `ToastComponent` | `/components/toast` | Toast notification system |

### Admin Dashboard Components

| Component | Path | Description |
|-----------|------|-------------|
| `LoginDevComponent` | `/components/login-dev` | Developer authentication |
| `UnauthorizedComponent` | `/components/unauthorized` | Access denied page |
| `CompaniesComponent` | `/components/companies` | Companies list & management |
| `CompanyDetailsComponent` | `/components/company-details` | Company detail view |
| `SubscriptionDashboardComponent` | `/components/subscription-dashboard` | Subscription analytics |

---

## 🛤 Routes & Navigation

### Route Configuration

```typescript
const routes: Routes = [
  // Landing page (default)
  { path: '', pathMatch: 'full', children: [] },
  
  // Developer login
  { path: 'dev-login', loadComponent: () => LoginDevComponent },
  
  // Unauthorized access
  { path: 'unauthorized', loadComponent: () => UnauthorizedComponent },
  
  // Protected: Companies dashboard
  { 
    path: 'dashboard/companies', 
    loadComponent: () => CompaniesComponent,
    canActivate: [AuthGuard]
  },
  
  // Protected: Company details
  { 
    path: 'dashboard/companies/:id', 
    loadComponent: () => CompanyDetailsComponent,
    canActivate: [AuthGuard]
  },
  
  // Protected: Subscription dashboard (Developer only)
  { 
    path: 'dashboard/subscriptions', 
    loadComponent: () => SubscriptionDashboardComponent,
    canActivate: [AuthGuard, DeveloperGuard]
  },
  
  // Fallback
  { path: '**', redirectTo: '' }
];
```

### Route Guards

| Guard | Purpose |
|-------|---------|
| `AuthGuard` | Protects routes requiring authentication |
| `DeveloperGuard` | Restricts access to developer-only routes |

---

## 🔧 Services

### AuthService
```typescript
// Authentication management
- login(credentials)     // Developer login
- logout()               // Clear session
- isAuthenticated()      // Check auth status
- isDeveloper()          // Check developer role
```

### CompanyService
```typescript
// Company API operations
- getAll()               // List all companies
- getById(id)            // Get company details
- getStats()             // Company statistics
```

### SubscriptionService
```typescript
// Subscription management
- getPlans()             // Available plans
- getStats()             // Subscription statistics
- getRevenue()           // Revenue metrics
```

### SubscriptionStatsService
```typescript
// Analytics and charts data
- getChartData()         // Chart datasets
- getGrowthMetrics()     // Growth statistics
```

### ToastService
```typescript
// Notification system
- success(message)       // Success notification
- error(message)         // Error notification
- info(message)          // Info notification
```

---

## 🎨 Styling

### SCSS Architecture

```scss
// Global styles in styles.scss
- CSS custom properties (variables)
- Bootstrap customizations
- AOS animation overrides
- Component-specific utilities
- Responsive breakpoints
```

### Color Palette

```scss
// Primary brand colors
$primary: #4F46E5;      // Indigo
$secondary: #6366F1;    // Light indigo
$accent: #10B981;       // Emerald
$dark: #1F2937;         // Gray 800
```

### Typography

```scss
// Using Inter font family
font-family: 'Inter', sans-serif;
// Weights: 400, 500, 600, 700, 800, 900
```

---

## 🚀 Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Deploy to Vercel:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Manual Deployment

```bash
# Build production bundle
ng build --configuration=production

# Files will be in dist/faltarah-landing/browser/
# Deploy to any static hosting service
```

---

## 🧪 Testing

```bash
# Run unit tests
ng test
# or
npm test

# Run with coverage
ng test --code-coverage
```

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run watch` | Build with watch mode |
| `npm test` | Run unit tests |
| `npm run lint` | Run linting |

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Faltarah Team** - *Initial work*

---

<div align="center">

**Built with ❤️ using Angular, Bootstrap, and AOS**

</div>
