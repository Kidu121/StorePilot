export interface Product {
  id: string;
  name: string;
  description?: string;

  category: string;
  sku: string;
  brand: string;

  buyingPrice: number;
  sellingPrice: number;

  quantity: number;
  unit: string;
  lowStockAlert: number;

  size?: string;
  color?: string;
  imageUrl?: string;
}