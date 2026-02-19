# 🔑 Get Supabase Service Role Key

## ❌ Current Issue:
The RLS error persists because the API is using the **anon key** which enforces Row Level Security policies.

## ✅ Solution:
Use the **Service Role Key** which bypasses RLS for server-side operations.

---

## 📋 Step-by-Step Guide:

### **Step 1: Get Your Service Role Key**

1. Open Supabase Dashboard: https://tlvvtzxpszyrrhytdghg.supabase.co
2. Click: **Settings** (gear icon in left sidebar)
3. Click: **API** (under Project Settings)
4. Scroll down to: **Project API keys**
5. Find: **service_role** key (NOT the anon key)
6. Click: **Reveal** or **Copy** button
7. Copy the entire key (starts with `eyJ...`)

---

### **Step 2: Add Key to .env.local**

1. Open file: `shreeram/.env.local`
2. Find the line: `SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE`
3. Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key
4. Save the file

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://tlvvtzxpszyrrhytdghg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_jeuhsVsujTTDHHpWfc5a7Q_AKCyy5GP
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdnZ0enhwc3p5cnJoeXRkZ2hnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTYzODM2NzIwMCwiZXhwIjoxOTUzOTQzMjAwfQ.XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

### **Step 3: Restart Dev Server**

**IMPORTANT:** You MUST restart the dev server for environment variables to take effect!

1. Stop the current dev server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. Wait for server to start on http://localhost:9002

---

## 🔍 What Changed:

### **Before (Using Anon Key):**
```typescript
// This enforces RLS policies
const { data, error } = await supabase
    .from('products')
    .insert([newProduct]);
// ❌ RLS blocks the insert
```

### **After (Using Service Role Key):**
```typescript
// This bypasses RLS policies
const { data, error } = await supabaseAdmin
    .from('products')
    .insert([newProduct]);
// ✅ Insert succeeds!
```

---

## ⚠️ Security Note:

**NEVER expose the service role key in client-side code!**

✅ **Safe:** Using in API routes (server-side)  
❌ **Unsafe:** Using in components (client-side)  

The service role key has **full database access** and bypasses all security policies.

---

## 🎯 After Completing All Steps:

1. ✅ Service role key added to `.env.local`
2. ✅ Dev server restarted
3. ✅ API routes use `supabaseAdmin` for inserts
4. ✅ RLS error will be gone!

---

## 🧪 Test:

1. Refresh browser at http://localhost:9002
2. Login as admin or vendor
3. Try adding a product
4. **Success!** Product created without RLS error 🎉

---

## 📁 Files Modified:

1. ✅ `shreeram/src/lib/supabase.ts` - Added `supabaseAdmin` client
2. ✅ `shreeram/src/app/api/products/route.ts` - Uses `supabaseAdmin` for POST
3. ✅ `shreeram/.env.local` - Added `SUPABASE_SERVICE_ROLE_KEY`

---

## 🆘 Troubleshooting:

### **Still seeing RLS error?**
- Make sure you copied the **service_role** key (not anon key)
- Make sure you **restarted the dev server**
- Check that the key is on the correct line in `.env.local`
- No quotes needed around the key value

### **Can't find service role key?**
- Go to: Supabase Dashboard → Settings → API
- Look for "Project API keys" section
- Find the key labeled "service_role"
- Click "Reveal" to see the full key

---

## ⚡ Quick Checklist:

- [ ] Get service role key from Supabase Dashboard
- [ ] Add key to `.env.local` file
- [ ] Save the file
- [ ] Stop dev server (Ctrl+C)
- [ ] Start dev server (`npm run dev`)
- [ ] Refresh browser
- [ ] Test product creation

---

**Ready? Get your service role key and add it to `.env.local`!** 🚀

