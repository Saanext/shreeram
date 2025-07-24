
import type { User, Product, Order } from './types';

export const mockUsers: User[] = [
  { id: 'usr_001', name: 'Admin User', email: 'admin@rolecraft.com', role: 'admin', status: 'active', createdAt: '2023-01-15' },
  { id: 'usr_002', name: 'Fashionista Vendor', email: 'vendor1@example.com', role: 'vendor', status: 'active', createdAt: '2023-02-20' },
  { id: 'usr_003', name: 'Threads & Co', email: 'vendor2@example.com', role: 'vendor', status: 'inactive', createdAt: '2023-03-10' },
  { id: 'usr_004', name: 'Priya Sharma', email: 'priya@example.com', role: 'customer', status: 'active', createdAt: '2023-04-05' },
  { id: 'usr_005', name: 'Rahul Kumar', email: 'rahul@example.com', role: 'customer', status: 'active', createdAt: '2023-05-12' },
];

export const mockProducts: Product[] = [
  { id: 'prod_001', name: 'Men\'s Classic Cotton T-Shirt', description: 'A comfortable and stylish 100% cotton t-shirt for everyday wear.', price: 799.00, originalPrice: 999.00, category: 'Men', stock: 120, imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzaGlydHxlbnwwfHx8fDE3NTMzNTk4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080', vendorId: 'usr_002', isOnSale: true },
  { id: 'prod_002', name: 'Women\'s High-Waist Denim Jeans', description: 'Flattering high-waist jeans made from stretchable denim for a perfect fit.', price: 2499.00, category: 'Women', stock: 50, imageUrl: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3b21lbiUyMGplYW5zfGVufDB8fHx8MTc1MzM2MDAzNXww&ixlib=rb-4.1.0&q=80&w=1080', vendorId: 'usr_002', isBestSeller: true },
  { id: 'prod_003', name: 'Kids\' Graphic Print Hoodie', description: 'A cozy and fun hoodie with a vibrant graphic print, perfect for kids.', price: 1499.00, category: 'Kids', stock: 80, imageUrl: 'https://images.unsplash.com/photo-1624421898638-ff3058a3e22f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxraWQlMjBob29kaWV8ZW58MHx8fHwxNzUzMzU5ODcwfDA&ixlib=rb-4.1.0&q=80&w=1080', vendorId: 'usr_003', isBestSeller: true },
  { id: 'prod_004', name: 'Men\'s Formal Linen Shirt', description: 'A sharp and breathable linen shirt for formal occasions.', price: 2999.00, category: 'Men', stock: 200, imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaGlydHxlbnwwfHx8fDE3NTMzNTk5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080', vendorId: 'usr_002', isBestSeller: true },
  { id: 'prod_005', name: 'Women\'s Floral Maxi Dress', description: 'An elegant floral maxi dress, perfect for summer outings and parties.', price: 2999.00, originalPrice: 3499.00, category: 'Women', stock: 150, imageUrl: 'https://images.unsplash.com/photo-1558068078-7a6b350aed4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8JTIwd29tYW4lMjBtYXhpJTIwZHJlc3N8ZW58MHx8fHwxNzUzMzYwMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080', vendorId: 'usr_003', isOnSale: true, isBestSeller: true },
  { id: 'prod_006', name: 'Kids\' Striped Polo Shirt', description: 'A smart and casual striped polo shirt for kids, made from soft cotton.', price: 799.00, originalPrice: 899.00, category: 'Kids', stock: 300, imageUrl: 'https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb2xvJTIwc2hpcnR8ZW58MHx8fHwxNzUzMzYwMjA3fDA&ixlib=rb-4.1.0&q=80&w=1080', vendorId: 'usr_002', isOnSale: true },
];

export const mockOrders: Order[] = [
  { id: 'ord_001', customerId: 'usr_004', customerName: 'Priya Sharma', items: [{ productId: 'prod_005', productName: 'Women\'s Floral Maxi Dress', quantity: 1, price: 3499.00 }], total: 3499.00, status: 'Delivered', date: '2023-10-01', vendorId: 'usr_003' },
  { id: 'ord_002', customerId: 'usr_005', customerName: 'Rahul Kumar', items: [{ productId: 'prod_001', productName: 'Men\'s Classic Cotton T-Shirt', quantity: 2, price: 999.00 }, { productId: 'prod_004', productName: 'Men\'s Formal Linen Shirt', quantity: 1, price: 2999.00 }], total: 4997.00, status: 'Shipped', date: '2023-10-05', vendorId: 'usr_002' },
  { id: 'ord_003', customerId: 'usr_004', customerName: 'Priya Sharma', items: [{ productId: 'prod_002', productName: 'Women\'s High-Waist Denim Jeans', quantity: 1, price: 2499.00 }], total: 2499.00, status: 'Pending', date: '2023-10-10', vendorId: 'usr_002' },
];
