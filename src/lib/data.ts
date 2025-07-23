import type { User, Product, Order } from './types';

export const mockUsers: User[] = [
  { id: 'usr_001', name: 'Admin User', email: 'admin@rolecraft.com', role: 'admin', status: 'active', createdAt: '2023-01-15' },
  { id: 'usr_002', name: 'Vendor One', email: 'vendor1@example.com', role: 'vendor', status: 'active', createdAt: '2023-02-20' },
  { id: 'usr_003', name: 'Vendor Two', email: 'vendor2@example.com', role: 'vendor', status: 'inactive', createdAt: '2023-03-10' },
  { id: 'usr_004', name: 'Alice Johnson', email: 'alice@example.com', role: 'customer', status: 'active', createdAt: '2023-04-05' },
  { id: 'usr_005', name: 'Bob Williams', email: 'bob@example.com', role: 'customer', status: 'active', createdAt: '2023-05-12' },
];

export const mockProducts: Product[] = [
  { id: 'prod_001', name: 'Modern Desk Lamp', description: 'A sleek, minimalist desk lamp with adjustable brightness.', price: 75.00, category: 'Lighting', stock: 120, imageUrl: 'https://placehold.co/400x300.png', vendorId: 'usr_002' },
  { id: 'prod_002', name: 'Ergonomic Office Chair', description: 'High-back ergonomic chair with lumbar support and adjustable armrests.', price: 250.50, category: 'Furniture', stock: 50, imageUrl: 'https://placehold.co/400x300.png', vendorId: 'usr_002' },
  { id: 'prod_003', name: 'Wireless Mechanical Keyboard', description: 'A 75% layout mechanical keyboard with hot-swappable switches.', price: 120.00, category: 'Electronics', stock: 80, imageUrl: 'https://placehold.co/400x300.png', vendorId: 'usr_003' },
  { id: 'prod_004', name: 'Noise-Cancelling Headphones', description: 'Over-ear headphones with active noise cancellation and 30-hour battery life.', price: 199.99, category: 'Audio', stock: 200, imageUrl: 'https://placehold.co/400x300.png', vendorId: 'usr_002' },
  { id: 'prod_005', name: 'Smart Water Bottle', description: 'A bottle that tracks your water intake and glows to remind you to drink.', price: 49.95, category: 'Gadgets', stock: 150, imageUrl: 'https://placehold.co/400x300.png', vendorId: 'usr_003' },
  { id: 'prod_006', name: 'Minimalist Leather Wallet', description: 'A slim, RFID-blocking wallet made from premium leather.', price: 55.00, category: 'Accessories', stock: 300, imageUrl: 'https://placehold.co/400x300.png', vendorId: 'usr_002' },
];

export const mockOrders: Order[] = [
  { id: 'ord_001', customerId: 'usr_004', customerName: 'Alice Johnson', items: [{ productId: 'prod_001', productName: 'Modern Desk Lamp', quantity: 1, price: 75.00 }], total: 75.00, status: 'Delivered', date: '2023-10-01', vendorId: 'usr_002' },
  { id: 'ord_002', customerId: 'usr_005', customerName: 'Bob Williams', items: [{ productId: 'prod_003', productName: 'Wireless Mechanical Keyboard', quantity: 1, price: 120.00 }, { productId: 'prod_004', productName: 'Noise-Cancelling Headphones', quantity: 1, price: 199.99 }], total: 319.99, status: 'Shipped', date: '2023-10-05', vendorId: 'usr_003' },
  { id: 'ord_003', customerId: 'usr_004', customerName: 'Alice Johnson', items: [{ productId: 'prod_002', productName: 'Ergonomic Office Chair', quantity: 1, price: 250.50 }], total: 250.50, status: 'Pending', date: '2023-10-10', vendorId: 'usr_002' },
];
