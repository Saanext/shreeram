export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vendor' | 'customer';
  status: 'active' | 'inactive';
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  imageUrls: string[];
  vendorId: string;
  isBestSeller?: boolean;
  isOnSale?: boolean;
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
  productCount: number;
  imageUrl: string;
};
