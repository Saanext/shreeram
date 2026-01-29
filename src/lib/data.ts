
import type { User, Product, Order, Category } from './types';

export const mockUsers: User[] = [
  { id: 'usr_001', name: 'Admin User', email: 'admin@rolecraft.com', role: 'admin', status: 'active', createdAt: '2023-01-15' },
  { id: 'usr_002', name: 'Fashionista Vendor', email: 'vendor1@example.com', role: 'vendor', status: 'active', createdAt: '2023-02-20' },
  { id: 'usr_003', name: 'Threads & Co', email: 'vendor2@example.com', role: 'vendor', status: 'inactive', createdAt: '2023-03-10' },
  { id: 'usr_004', name: 'Priya Sharma', email: 'priya@example.com', role: 'customer', status: 'active', createdAt: '2023-04-05' },
  { id: 'usr_005', name: 'Rahul Kumar', email: 'rahul@example.com', role: 'customer', status: 'active', createdAt: '2023-05-12' },
];

export const mockProducts: Product[] = [
  { id: 'prod_001', name: 'Men\'s Classic Cotton T-Shirt', description: 'A comfortable and stylish 100% cotton t-shirt for everyday wear.', price: 799.00, originalPrice: 999.00, category: 'Men', subCategory: 'T-Shirts', stock: 120, imageUrls: ['https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzaGlydHxlbnwwfHx8fDE3NTMzNTk4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080', 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=2528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1622445279234-8a491a5a1f6a?q=80&w=2528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], vendorId: 'usr_002', isOnSale: true, sizes: ['S', 'M', 'L', 'XL'], details: { 'Fit': 'Regular Fit', 'Material': '100% Cotton', 'Care': 'Machine wash' }, sizeChartImageUrl: 'https://images.ctfassets.net/w6zaj6psw1h2/1YhW3s30lG4yCD6a2y2g9R/002d515a45a331165a6f23e42f5343f1/mens-tops-size-chart.jpg' },
  { id: 'prod_002', name: 'Women\'s High-Waist Denim Jeans', description: 'Flattering high-waist jeans made from stretchable denim for a perfect fit.', price: 2499.00, category: 'Women', subCategory: 'Jeans', stock: 50, imageUrls: ['https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3b21lbiUyMGplYW5zfGVufDB8fHx8MTc1MzM2MDAzNXww&ixlib=rb-4.1.0&q=80&w=1080', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], vendorId: 'usr_002', isBestSeller: true, sizes: ['28', '30', '32', '34', '36'], details: { 'Fit': 'High-Rise', 'Material': 'Denim', 'Care': 'Machine wash' }, sizeChartImageUrl: 'https://images.ctfassets.net/w6zaj6psw1h2/7G6hO91Qb68QJzSsgjopjE/63240a5a3a0c4fce9d34346808722c2a/womens-bottoms-size-chart.jpg' },
  { id: 'prod_003', name: 'Kids\' Graphic Print Hoodie', description: 'A cozy and fun hoodie with a vibrant graphic print, perfect for kids.', price: 1499.00, category: 'Kids', subCategory: 'Outerwear', stock: 80, imageUrls: ['https://images.unsplash.com/photo-1624421898638-ff3058a3e22f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxraWQlMjBob29kaWV8ZW58MHx8fHwxNzUzMzU5ODcwfDA&ixlib=rb-4.1.0&q=80&w=1080'], vendorId: 'usr_003', isBestSeller: true, sizes: ['2-4Y', '4-6Y', '6-8Y'], details: { 'Fit': 'Regular', 'Material': 'Fleece', 'Care': 'Machine wash' } },
  { id: 'prod_004', name: 'Men\'s Formal Linen Shirt', description: 'A sharp and breathable linen shirt for formal occasions.', price: 2999.00, category: 'Men', subCategory: 'Shirts', stock: 200, imageUrls: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaGlydHxlbnwwfHx8fDE3NTMzNTk5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080'], vendorId: 'usr_002', isBestSeller: true, sizes: ['38', '40', '42', '44'], details: { 'Fit': 'Slim Fit', 'Material': 'Linen Blend', 'Care': 'Machine wash' }, sizeChartImageUrl: 'https://images.ctfassets.net/w6zaj6psw1h2/1YhW3s30lG4yCD6a2y2g9R/002d515a45a331165a6f23e42f5343f1/mens-tops-size-chart.jpg' },
  { id: 'prod_005', name: 'Women\'s Floral Maxi Dress', description: 'An elegant floral maxi dress, perfect for summer outings and parties.', price: 2999.00, originalPrice: 3499.00, category: 'Women', subCategory: 'Dresses', stock: 150, imageUrls: ['https://images.unsplash.com/photo-1558068078-7a6b350aed4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8JTIwd29tYW4lMjBtYXhpJTIwZHJlc3N8ZW58MHx8fHwxNzUzMzYwMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080', 'https://images.unsplash.com/photo-1594744806548-993414923e59?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], vendorId: 'usr_003', isOnSale: true, isBestSeller: true, sizes: ['S', 'M', 'L', 'XL'], details: { 'Style': 'Maxi', 'Material': 'Polyester', 'Care': 'Dry clean' }, sizeChartImageUrl: 'https://images.ctfassets.net/w6zaj6psw1h2/5555zMvva4OJJyFAJdFvS8/b24f5a896d8b9e672728479e0a2b53b8/womens-dresses-size-chart.jpg' },
  { id: 'prod_006', name: 'Kids\' Striped Polo Shirt', description: 'A smart and casual striped polo shirt for kids, made from soft cotton.', price: 799.00, originalPrice: 899.00, category: 'Kids', subCategory: 'T-Shirts', stock: 300, imageUrls: ['https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb2xvJTIwc2hpcnR8ZW58MHx8fHwxNzUzMzYwMjA7fDA&ixlib=rb-4.1.0&q=80&w=1080'], vendorId: 'usr_002', isOnSale: true, sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'], details: { 'Sleeve': 'Half Sleeve', 'Material': 'Cotton', 'Care': 'Machine wash' } },
];

export const mockOrders: Order[] = [
  { id: 'ord_001', customerId: 'usr_004', customerName: 'Priya Sharma', items: [{ productId: 'prod_005', productName: 'Women\'s Floral Maxi Dress', quantity: 1, price: 3499.00 }], total: 3499.00, status: 'Delivered', date: '2023-10-01', vendorId: 'usr_003' },
  { id: 'ord_002', customerId: 'usr_005', customerName: 'Rahul Kumar', items: [{ productId: 'prod_001', productName: 'Men\'s Classic Cotton T-Shirt', quantity: 2, price: 999.00 }, { productId: 'prod_004', productName: 'Men\'s Formal Linen Shirt', quantity: 1, price: 2999.00 }], total: 4997.00, status: 'Shipped', date: '2023-10-05', vendorId: 'usr_002' },
  { id: 'ord_003', customerId: 'usr_004', customerName: 'Priya Sharma', items: [{ productId: 'prod_002', productName: 'Women\'s High-Waist Denim Jeans', quantity: 1, price: 2499.00 }], total: 2499.00, status: 'Pending', date: '2023-10-10', vendorId: 'usr_002' },
];

export const mockCategories: Category[] = [
  { id: 'cat_001', name: 'Men', productCount: 2, imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg' },
  { id: 'cat_002', name: 'Women', productCount: 2, imageUrl: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg' },
  { id: 'cat_003', name: 'Kids', productCount: 2, imageUrl: 'https://images.pexels.com/photos/1619779/pexels-photo-1619779.jpeg' },
  { id: 'cat_home', name: 'Home', productCount: 0, imageUrl: 'https://picsum.photos/seed/home/400/400' },
  { id: 'cat_beauty', name: 'Beauty', productCount: 0, imageUrl: 'https://picsum.photos/seed/beauty/400/400' },
  { id: 'cat_studio', name: 'Studio', productCount: 0, imageUrl: 'https://picsum.photos/seed/studio/400/400' },

  // Men's Subcategories
  { id: 'cat_004', name: 'T-Shirts', parentId: 'cat_001', group: 'Topwear', productCount: 1, imageUrl: 'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg' },
  { id: 'cat_005', name: 'Shirts', parentId: 'cat_001', group: 'Topwear', productCount: 1, imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg' },
  { id: 'cat_006', name: 'Jeans', parentId: 'cat_001', group: 'Bottomwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg' },
  { id: 'cat_007', name: 'Trousers', parentId: 'cat_001', group: 'Bottomwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg' },
  { id: 'cat_008', name: 'Shorts', parentId: 'cat_001', group: 'Bottomwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
  { id: 'cat_009', name: 'Jackets', parentId: 'cat_001', group: 'Outerwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg' },
  { id: 'cat_010', name: 'Footwear', parentId: 'cat_001', group: 'Footwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg' },
  { id: 'cat_011', name: 'Accessories', parentId: 'cat_001', group: 'Accessories', productCount: 0, imageUrl: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg' },

  // Women's Subcategories
  { id: 'cat_012', name: 'Dresses', parentId: 'cat_002', group: 'Dresses & Gowns', productCount: 1, imageUrl: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg' },
  { id: 'cat_013', name: 'Tops', parentId: 'cat_002', group: 'Topwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg' },
  { id: 'cat_014', name: 'Jeans', parentId: 'cat_002', group: 'Bottomwear', productCount: 1, imageUrl: 'https://images.pexels.com/photos/932401/pexels-photo-932401.jpeg' },
  { id: 'cat_015', name: 'Skirts', parentId: 'cat_002', group: 'Bottomwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg' },
  { id: 'cat_016', name: 'Sarees', parentId: 'cat_002', group: 'Ethnic Wear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/5860579/pexels-photo-5860579.jpeg' },
  { id: 'cat_017', name: 'Handbags', parentId: 'cat_002', group: 'Accessories', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg' },
  { id: 'cat_018', name: 'Jewellery', parentId: 'cat_002', group: 'Accessories', productCount: 0, imageUrl: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg' },
  { id: 'cat_019', name: 'Heels', parentId: 'cat_002', group: 'Footwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/2927080/pexels-photo-2927080.jpeg' },

  // Kids' Subcategories
  { id: 'cat_020', name: 'T-Shirts', parentId: 'cat_003', group: 'Boys Clothing', productCount: 1, imageUrl: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg' },
  { id: 'cat_021', name: 'Outerwear', parentId: 'cat_003', group: 'Boys Clothing', productCount: 1, imageUrl: 'https://images.pexels.com/photos/5929/food-shoelaces-tab-shoes.jpg' },
  { id: 'cat_022', name: 'Dresses', parentId: 'cat_003', group: 'Girls Clothing', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg' },
  { id: 'cat_023', name: 'Toys', parentId: 'cat_003', group: 'Toys & Games', productCount: 0, imageUrl: 'https://images.pexels.com/photos/3661202/pexels-photo-3661202.jpeg' },
  { id: 'cat_024', name: 'Shoes', parentId: 'cat_003', group: 'Footwear', productCount: 0, imageUrl: 'https://images.pexels.com/photos/1619793/pexels-photo-1619793.jpeg' },
  { id: 'cat_025', name: 'Baby Care', parentId: 'cat_003', group: 'Baby Care', productCount: 0, imageUrl: 'https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg' },
  { id: 'cat_026', name: 'School Supplies', parentId: 'cat_003', group: 'School Supplies', productCount: 0, imageUrl: 'https://images.pexels.com/photos/4260477/pexels-photo-4260477.jpeg' },
  { id: 'cat_027', name: 'Party Wear', parentId: 'cat_003', group: 'Girls Clothing', productCount: 0, imageUrl: 'https://images.pexels.com/photos/10313331/pexels-photo-10313331.jpeg' },
];
