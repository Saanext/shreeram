
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createDemoUser(email, password, role, name, extraMetadata = {}) {
    console.log(`Creating ${role} user: ${email}...`);
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: role,
                ...extraMetadata
            }
        }
    });

    if (error) {
        console.error(`Error creating ${role}:`, error.message);
    } else if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
            console.log(`User ${email} already exists.`);
        } else {
            console.log(`Successfully created ${role}: ${email}`);
        }
    }
}

async function main() {
    await createDemoUser('customer@demo.com', 'password123', 'customer', 'Demo Customer');
    await createDemoUser('vendor@demo.com', 'password123', 'vendor', 'Demo Vendor', { store_name: 'Demo Store' });
    await createDemoUser('admin@demo.com', 'password123', 'admin', 'Demo Admin');
}

main();
