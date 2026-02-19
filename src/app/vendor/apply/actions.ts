'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function submitVendorApplication(formData: FormData) {
    const supabase = await createClient();

    const rawData = {
        full_name: formData.get('full_name') as string,
        email: formData.get('email') as string,
        store_name: formData.get('store_name') as string,
        phone: formData.get('phone') as string,
        gst_number: formData.get('gst_number') as string,
        address: formData.get('address') as string,
    };

    // Basic Validation
    if (!rawData.full_name || !rawData.email || !rawData.store_name) {
        return { error: 'Missing required fields' };
    }

    // Insert into vendor_applications table
    // Note: RLS 'Public create applications' allows this insert.
    const { error } = await supabase
        .from('vendor_applications')
        .insert([
            {
                ...rawData,
                status: 'pending',
            }
        ]);

    if (error) {
        console.error('Application Error:', error);
        return { error: 'Failed to submit application. Please try again.' };
    }

    // Success
    return { success: true };
}
