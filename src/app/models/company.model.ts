// 📁 src/app/models/company.model.ts
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}