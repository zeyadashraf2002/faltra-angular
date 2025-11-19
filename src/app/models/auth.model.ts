// src/app/models/auth.model.ts
export interface User {
  id: number;
  companyId: number;
  companyName: string;
  fullName: string;
  email: string;
  role: 'developer' | 'manager' | 'employee';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

// src/app/models/company.model.ts
export interface Company {
  id: number;
  name: string;
  logo: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  subscriptionExpiryDate: string;
  createdAt: string;
  _count?: {
    users: number;
    customers: number;
    invoices: number;
  };
}

export interface UpdateSubscriptionRequest {
  subscriptionExpiryDate: string;
}