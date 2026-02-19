
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSlugs() {
    console.log('Checking specific slug: luxury-satin-party-shirt-black');
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            category:categories!category_id(name),
            vendor:vendors!vendor_id(full_name, store_name)
        `)
        .eq('slug', 'luxury-satin-party-shirt-black')
        .single();

    if (error) {
        console.error('Error fetching specific slug:', error);
    } else {
        console.log('Successfully fetched product:', data.name);
        console.log('Vendor:', data.vendor);
        console.log('Category:', data.category);
    }
}

checkSlugs();
