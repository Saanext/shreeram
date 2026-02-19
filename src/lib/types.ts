
export type Admin = {
  id: string;
  fullName: string;
  email: string;
  role: 'admin';
  createdAt: string;
};

export type Vendor = {
  id: string;
  fullName: string;
  email: string;
  storeName?: string;
  gstNumber?: string;
  role: 'vendor';
  createdAt: string;
};

export type Customer = {
  id: string;
  fullName: string;
  email: string;
  shippingAddress?: string;
  role: 'customer';
  createdAt: string;
};

export type User = Admin | Vendor | Customer;

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory?: string;
  stock: number;
  imageUrls: string[];
  vendorId: string;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  sizes?: string[];
  colors?: string[];
  details?: { [key: string]: string };
  tags?: string[];
  sku?: string;
  sizeChartImageUrl?: string;
  slug?: string;
  discountPrice?: number;
};

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  vendorId: string;
};

export type Category = {
  id: string;
  name: string;
  parentId?: string;
  group?: string;
  productCount: number;
  imageUrl: string;
};
