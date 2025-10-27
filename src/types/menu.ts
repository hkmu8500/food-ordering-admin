export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

// API Response Type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
