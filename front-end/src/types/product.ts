export interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  images?: string | string[];
  description?: string;
}
