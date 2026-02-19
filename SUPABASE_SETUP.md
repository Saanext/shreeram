# 🚀 Supabase Setup Guide

This guide will help you set up your Supabase database and add demo products through the admin interface.

## 📋 Prerequisites

- Supabase account and project created
- Environment variables configured in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL=https://tlvvtzxpszyrrhytdghg.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_jeuhsVsujTTDHHpWfc5a7Q_AKCyy5GP`

## 🔧 Step 1: Run Database Migration

1. Open your Supabase Dashboard: https://tlvvtzxpszyrrhytdghg.supabase.co
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire content of `shreeram/supabase/reset_and_init.sql`
5. Paste it into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)

**What this does:**
- ✅ Creates all database tables (admins, vendors, customers, categories, products, orders, etc.)
- ✅ Sets up Row Level Security (RLS) policies
- ✅ Creates storage buckets for product images and vendor documents
- ✅ Inserts initial categories: "Men" and "Women"
- ✅ Sets up triggers for audit logging
- ✅ Creates helper functions for user role management

## 👤 Step 2: Create Admin User

### 2.1 Register a New User

1. Start your development server: `npm run dev`
2. Open http://localhost:9002/register in your browser
3. Register with email: `shriraminterio18@gmail.com` (or any email you prefer)
4. Complete the registration form
5. Verify your email if required

### 2.2 Promote User to Admin

1. Go back to **Supabase SQL Editor**
2. Click **New Query**
3. Copy the content of `shreeram/supabase/promote_admin.sql`
4. If you used a different email, update line 13:
   ```sql
   target_email TEXT := 'your-email@example.com';
   ```
5. Click **Run**
6. You should see: `SUCCESS: User your-email@example.com is now an ADMIN.`

## 🛍️ Step 3: Add Demo Products via Admin Interface

### 3.1 Login as Admin

1. Go to http://localhost:9002/login
2. Login with your admin credentials
3. You should be redirected to the admin dashboard

### 3.2 Add Products

1. Navigate to **Products** in the admin sidebar
2. Click **Add Product** button
3. Fill in the product details:
   - **Name**: e.g., "Men's Classic Cotton T-Shirt"
   - **Description**: Product description
   - **Images**: Add product image URLs (use stock images from Unsplash)
   - **Category**: Select from dropdown (Men/Women)
   - **Price**: Product price
   - **Stock**: Available quantity
   - **Best Seller**: Check if it's a best seller
   - **On Sale**: Check if it's on sale

### 3.3 Stock Image Sources

You can use these free stock image sources:
- **Unsplash**: https://unsplash.com/s/photos/clothing
- **Pexels**: https://www.pexels.com/search/fashion/
- **Pixabay**: https://pixabay.com/images/search/clothing/

**Example Image URLs:**
```
https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800
https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800
https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800
```

## 📦 Sample Products to Add

Here are some sample products you can add:

### Product 1: Men's Classic Cotton T-Shirt
- **Name**: Men's Classic Cotton T-Shirt
- **Description**: Comfortable cotton t-shirt perfect for everyday wear
- **Price**: 799
- **Stock**: 50
- **Category**: Men
- **Images**: https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800
- **Best Seller**: Yes
- **On Sale**: No

### Product 2: Women's High-Waist Denim Jeans
- **Name**: Women's High-Waist Denim Jeans
- **Description**: Stylish high-waist denim jeans with a modern fit
- **Price**: 1499
- **Stock**: 30
- **Category**: Women
- **Images**: https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800
- **Best Seller**: No
- **On Sale**: Yes

### Product 3: Men's Formal Linen Shirt
- **Name**: Men's Formal Linen Shirt
- **Description**: Breathable linen shirt for formal occasions
- **Price**: 1299
- **Stock**: 25
- **Category**: Men
- **Images**: https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800
- **Best Seller**: Yes
- **On Sale**: No

## ✅ Verification

After adding products, verify everything is working:

1. **Homepage**: Go to http://localhost:9002 - you should see your products
2. **Product Detail**: Click on a product - you should see the detail page
3. **Categories**: Check that categories are loading in the navigation
4. **Admin Dashboard**: Check that product count is updated

## 🐛 Troubleshooting

### Products not showing on homepage
- Check browser console for errors
- Verify Supabase connection in `.env.local`
- Check RLS policies in Supabase dashboard

### Cannot add products
- Verify you're logged in as admin
- Check browser console for API errors
- Verify category IDs exist in database

### Images not loading
- Ensure image URLs are publicly accessible
- Check CORS settings if using external images
- Verify storage bucket permissions in Supabase

## 📚 Next Steps

- Add more categories and subcategories
- Upload custom product images to Supabase Storage
- Create vendor accounts and assign products to vendors
- Configure additional product fields (sizes, details, size charts)


