# 🔒 Fix RLS (Row Level Security) Error

## ❌ Current Error:
```
Error: new row violates row-level security policy for table "products"
```

## 🎯 What This Means:
Supabase's Row Level Security (RLS) is blocking product insertion because the current policies don't allow the logged-in user to insert products.

---

## ✅ Solution (2 Steps):

### **Step 1: Run the RLS Fix Migration**

1. Open Supabase Dashboard: https://tlvvtzxpszyrrhytdghg.supabase.co
2. Click: **SQL Editor** (left sidebar)
3. Click: **New Query**
4. Copy the entire content from: `shreeram/supabase/fix_rls_policies.sql`
5. Paste into SQL Editor
6. Click: **Run** (or press Ctrl+Enter)

**What this does:**
- ✅ Allows public read access to products
- ✅ Allows vendors to insert/update/delete their own products
- ✅ Allows admins to insert/update/delete ANY product
- ✅ Fixes the RLS policy violation error

---

### **Step 2: Run the Missing Columns Migration** (If not done yet)

1. In the same SQL Editor, click **New Query**
2. Copy the entire content from: `shreeram/supabase/add_missing_columns.sql`
3. Paste into SQL Editor
4. Click: **Run**

**What this does:**
- ✅ Adds missing columns: `details`, `original_price`, `sizes`, `colors`, `tags`, `sku`, `size_chart_url`, `sub_category`

---

## 🔍 Understanding RLS Policies:

### **What are RLS Policies?**
Row Level Security (RLS) policies control who can read, insert, update, or delete rows in a table.

### **Current Policies After Fix:**

1. **SELECT (Read)** - Anyone can view products ✅
2. **INSERT (Create)** - Only admins and vendors can create products ✅
3. **UPDATE (Edit)** - Only admins and product owners can edit ✅
4. **DELETE (Remove)** - Only admins and product owners can delete ✅

---

## 🚀 After Running Both Migrations:

### **You'll be able to:**
- ✅ Create products as admin (for any vendor)
- ✅ Create products as vendor (for yourself)
- ✅ View all products (public access)
- ✅ Edit/delete your own products
- ✅ Use all product fields (sizes, colors, details, etc.)

---

## 🧪 Testing:

1. **Refresh your browser** at http://localhost:9002
2. **Login as admin or vendor**
3. **Try adding a product**:
   - Fill in product name, description, price
   - Select a category from dropdown
   - Upload images
   - Click "Add Product"
4. **Success!** Product should be created without errors 🎉

---

## 📋 Quick Checklist:

- [ ] Run `fix_rls_policies.sql` in Supabase SQL Editor
- [ ] Run `add_missing_columns.sql` in Supabase SQL Editor
- [ ] Refresh browser
- [ ] Test product creation
- [ ] Verify no errors in console

---

## 🆘 Still Having Issues?

If you still see errors after running both migrations:

1. **Check Authentication**: Make sure you're logged in
2. **Check User Role**: Verify you're logged in as admin or vendor
3. **Check Console**: Look for any other error messages
4. **Check Supabase Logs**: Go to Supabase Dashboard → Logs

---

## 📝 Files to Run:

1. **First**: `shreeram/supabase/fix_rls_policies.sql` ⭐ **RUN THIS NOW**
2. **Second**: `shreeram/supabase/add_missing_columns.sql`

**Both files are safe to run multiple times!** ✅

---

**Ready to fix? Open Supabase SQL Editor and run the migrations!** 🚀

