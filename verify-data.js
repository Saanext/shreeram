
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyTables() {
    console.log('--- TEST 1: Logging in as Admin (shyam@shreeram.com) ---');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'shyam@shreeram.com',
        password: 'shyam@ecomm'
    });

    if (authError) {
        console.error('❌ Login FAILED:', authError.message);
        console.log('Note: This might be due to the SQL seed password hash not matching Supabase expectations.');
        return;
    } else {
        console.log('✅ Login SUCCESS! User ID:', authData.user.id);
    }

    console.log('--- Verifying Data Storage ---');

    // Check Admins
    const { data: admins, error: adminError } = await supabase.from('admins').select('*');
    if (adminError) console.error('Error fetching admins:', adminError.message);
    console.log(`\nAdmins Found (${admins?.length || 0}):`);
    console.table(admins);

    // Check Vendors
    const { data: vendors, error: vendorError } = await supabase.from('vendors').select('*');
    if (vendorError) console.error('Error fetching vendors:', vendorError.message);
    console.log(`\nVendors Found (${vendors?.length || 0}):`);
    console.table(vendors);

    // Check Customers
    const { data: customers, error: customerError } = await supabase.from('customers').select('*');
    if (customerError) console.error('Error fetching customers:', customerError.message);
    console.log(`\nCustomers Found (${customers?.length || 0}):`);
    console.table(customers);
}

verifyTables();
