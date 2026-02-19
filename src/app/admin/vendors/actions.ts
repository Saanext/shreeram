'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function approveVendor(applicationId: string) {
    const supabase = await createClient();

    // 1. Verify Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    // Check if user is admin (using public.users table or metadata, depending on your setup)
    // Assuming metadata or a secure way to check role
    const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single();
    // Fallback: Check metadata if table check fails or if you use metadata for roles
    const isAdmin = user.user_metadata?.role === 'admin' || userData?.role === 'admin';

    if (!isAdmin) {
        // Double check with RPC if available
        const { data: rpcRole } = await supabase.rpc('get_user_role');
        if (rpcRole !== 'admin') return { error: 'Unauthorized' };
    }

    // 2. Fetch Application
    const { data: app, error: appError } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('id', applicationId)
        .single();

    if (appError || !app) return { error: 'Application not found' };
    if (app.status === 'approved') return { error: 'Already approved' };

    const supabaseAdmin = await createAdminClient();

    // 3. Promote User to Vendor (Update Metadata & Public Table)
    // The user_id should already be in the application from registration
    const targetUserId = app.user_id;

    if (targetUserId) {
        // Update Auth Metadata & Confirm Email
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(targetUserId, {
            email_confirm: true,
            user_metadata: { role: 'vendor' }
        });

        if (updateError) {
            console.error("Failed to update user metadata/confirm:", updateError);
            return { error: "Failed to confirm user email/role: " + updateError.message };
        }

        // 4. Create Vendor Profile
        // Check if already exists to avoid errors
        const { data: existingVendor } = await supabaseAdmin
            .from('vendors')
            .select('id')
            .eq('id', targetUserId)
            .single();

        if (!existingVendor) {
            const { error: vendorError } = await supabaseAdmin.from('vendors').insert({
                id: targetUserId,
                full_name: app.full_name,
                email: app.email, // Ensure email is passed
                store_name: app.store_name,
                phone: app.phone,
                gst_number: app.gst_number,
                business_location: app.business_location, // Map location to address if needed, or add column
                is_verified: true
            });

            if (vendorError) {
                console.error('Vendor Profile Error:', vendorError);
                return { error: 'Failed to create vendor profile: ' + vendorError.message };
            }
        }
    } else {
        console.error("Application missing user_id:", app);
        return { error: "Application is missing user_id. Cannot approve." };
    }

    // 5. Update Application Status
    const { error: updateError } = await supabaseAdmin
        .from('vendor_applications')
        .update({ status: 'approved' })
        .eq('id', applicationId);

    if (updateError) {
        console.error("Failed to update status:", updateError);
        return { error: 'Failed to update application status' };
    }

    console.log("Vendor approved successfully:", applicationId);
    revalidatePath('/admin/vendors');
    return { success: true };
}
