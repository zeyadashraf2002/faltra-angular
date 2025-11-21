export interface SubscriptionHistoryItem {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  plan: {
    id: number;
    name: string;
    nameAr: string;
    price: number;
    durationDays: number;
  };
}

export interface SubscriptionInvoice {
  id: number;
  subscriptionId?: number | null; // Optional because Prisma uses Int?
  planName: string;
  amount: number;
  durationDays: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  paidAt: string | null;
}

export interface SubscriptionStatus {
  company: {
    id: number;
    name: string;
    email: string;
  };

  status: 'active' | 'expired';

  currentSubscription: {
    id: number;
    status: string;
    startDate: string;
    endDate: string;
    plan: {
      id: number;
      name: string;
      nameAr: string;
      price: number;
      durationDays: number;
    };
  } | null;

  daysRemaining: number;
  expiryDate: string;

  subscriptionHistory: SubscriptionHistoryItem[];

  invoices: SubscriptionInvoice[];

  unreadAlerts: any[];
  alertsHistory: any[];
}
