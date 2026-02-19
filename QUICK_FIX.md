# 🚀 QUICK FIX - Database Migration

## ❌ Current Error:
```
Error: Could not find the 'size_chart_url' column of 'products' in the schema cache
```

## ✅ Solution (3 Steps):

### Step 1: Open Supabase SQL Editor
1. Go to: https://tlvvtzxpszyrrhytdghg.supabase.co
2. Click: **SQL Editor** (left sidebar)
3. Click: **New Query**

### Step 2: Copy Migration File
1. Open file: `shreeram/supabase/add_missing_columns.sql`
2. Copy **ALL** content (Ctrl+A, Ctrl+C)
3. Paste into Supabase SQL Editor

### Step 3: Run Migration
1. Click **Run** button (or press Ctrl+Enter)
2. Wait for success message
3. **Refresh your browser**

---

## 📦 What Gets Added:

### Products Table (10 new columns):
✅ `details` - Product details (Material, Fit, Care, etc.)  
✅ `original_price` - Original price for discounts  
✅ `sizes` - Available sizes (S, M, L, XL, etc.)  
✅ `colors` - Available colors  
✅ `tags` - Search tags  
✅ `sku` - Stock Keeping Unit  
✅ `size_chart_url` - **Size chart image URL** ⭐  
✅ `sub_category` - Subcategory (T-Shirts, Jeans, etc.)  

### Orders Table (4 new columns):
✅ `shipping_address`  
✅ `payment_method`  
✅ `payment_status`  
✅ `tracking_number`  

### Customers Table (1 new column):
✅ `avatar_url`  

### Vendors Table (2 new columns):
✅ `logo_url`  
✅ `description`  

---

## 🎯 After Migration:

1. ✅ All errors will be fixed
2. ✅ Admin dashboard will work
3. ✅ Vendor dashboard will work
4. ✅ Products can have size charts
5. ✅ All features fully functional

---

## 🔒 100% Safe:
- ✅ No data loss
- ✅ Can run multiple times
- ✅ Non-destructive
- ✅ Keeps all existing data

---

## ⚡ DO THIS NOW:
1. Open Supabase SQL Editor
2. Copy `add_missing_columns.sql`
3. Paste and Run
4. Refresh browser

**That's it! Error fixed!** 🎉

