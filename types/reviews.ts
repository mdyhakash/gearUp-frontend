export interface Review {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  gearItem: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface GearReview {
  id: string;
  customerId: string;
  gearItemId: string;
  rentalOrderId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
}

export interface GearReviewMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  averageRating: number;
}
