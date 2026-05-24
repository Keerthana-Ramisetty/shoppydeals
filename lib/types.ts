export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  affiliateLink: string;
  category: Category | string;
  store: string;
  featured: boolean;
  clicks: number;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasMore: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface DashboardStats {
  totalProducts: number;
  totalClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
}
