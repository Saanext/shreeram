# 🔧 Database Migration Guide - Add Missing Columns

## Problem
The application is throwing an error: **"Could not find the 'details' column of 'products' in the schema cache"**

This happens because the code is trying to access columns that don't exist in the database yet.

## Solution
Run the migration file `add_missing_columns.sql` to add all missing columns to your existing tables **without losing any data**.

---

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard: https://tlvvtzxpszyrrhytdghg.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run the Migration

1. Open the file: `shreeram/supabase/add_missing_columns.sql`
2. Copy the **entire content** of the file
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify Success

You should see a success message:
```
Migration completed successfully! Missing columns have been added.
```

---

## 📊 What This Migration Does

### Products Table - New Columns Added:
- ✅ `details` (JSONB) - For flexible product details like Material, Fit, Care Instructions
- ✅ `original_price` (NUMERIC) - For showing discounts
- ✅ `sizes` (TEXT[]) - Array of available sizes (S, M, L, XL, etc.)
- ✅ `colors` (TEXT[]) - Array of available colors
- ✅ `tags` (TEXT[]) - For search and filtering
- ✅ `sku` (TEXT) - Stock Keeping Unit
- ✅ `size_chart_url` (TEXT) - URL for size chart image
- ✅ `sub_category` (TEXT) - Product subcategory (T-Shirts, Jeans, etc.)

### Orders Table - New Columns Added:
- ✅ `shipping_address` (TEXT) - Customer shipping address
- ✅ `payment_method` (TEXT) - Payment method used
- ✅ `payment_status` (TEXT) - Payment status (pending, completed, failed)
- ✅ `tracking_number` (TEXT) - Shipment tracking number

### Customers Table - New Columns Added:
- ✅ `avatar_url` (TEXT) - Customer profile picture URL

### Vendors Table - New Columns Added:
- ✅ `logo_url` (TEXT) - Vendor logo URL
- ✅ `description` (TEXT) - Vendor description

---

## 🔒 Safety Features

This migration is **100% safe** because:

1. ✅ **No data loss** - Only adds new columns, doesn't drop or modify existing ones
2. ✅ **Idempotent** - Can be run multiple times safely (checks if column exists before adding)
3. ✅ **Transaction-based** - Uses BEGIN/COMMIT to ensure all-or-nothing execution
4. ✅ **Non-destructive** - Doesn't affect existing data or columns

---

## 🎯 After Migration

Once the migration is complete:

1. **Refresh your browser** - The error should be gone
2. **Test the admin dashboard** - Should load without errors
3. **Test adding products** - You can now add products with details, sizes, colors
4. **Test vendor dashboard** - Should work seamlessly

---

## 📝 Example: Adding Product Details

After migration, you can add products with rich details:

```json
{
  "name": "Men's Cotton T-Shirt",
  "price": 799,
  "original_price": 999,
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colors": ["Black", "White", "Navy", "Gray"],
  "sub_category": "T-Shirts",
  "size_chart_url": "https://example.com/size-charts/mens-tshirt.jpg",
  "details": {
    "Material": "100% Cotton",
    "Fit": "Regular Fit",
    "Care": "Machine Wash",
    "Pattern": "Solid",
    "Sleeve": "Short Sleeve"
  },
  "tags": ["casual", "summer", "cotton", "comfortable"]
}
```

---

## ❓ Troubleshooting

### If you see "column already exists" error:
- ✅ This is normal! The migration checks for existing columns
- ✅ The migration will skip columns that already exist
- ✅ No action needed

### If migration fails:
1. Check your Supabase connection
2. Make sure you have admin privileges
3. Try running the migration again (it's safe to re-run)

### If error persists after migration:
1. Clear your browser cache
2. Restart the Next.js dev server
3. Check the browser console for new errors

---

## 🚀 Next Steps

After successful migration:

1. ✅ Admin dashboard will work without errors
2. ✅ Vendor dashboard will work without errors  
3. ✅ You can start adding products with full details
4. ✅ All features will work seamlessly

---

## 📞 Need Help?

If you encounter any issues:
1. Check the Supabase SQL Editor for error messages
2. Verify all tables exist in your database
3. Make sure you're connected to the correct Supabase project

---

**Ready to migrate? Follow Step 1 above!** 🎉

