export interface Product {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  images?: string | string[];
  description?: string;
}
