'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function handleVendorRegister(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const storeName = formData.get("storeName") as string;
    const phone = formData.get("phone") as string;
    const gst = formData.get("gst") as string;
    const location = formData.get("location") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const documentFile = formData.get("documents") as File;

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    // 1. Sign up the user (or sign in if already exists? No, this is register)
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: 'vendor', // Important: Set role metadata
            },
        },
    });

    if (authError) {
        return { error: authError.message };
    }

    const userId = authData.user?.id;
    if (!userId) {
        return { error: "Failed to create user" };
    }

    // 2. Upload Document
    let documentUrl = "";
    if (documentFile && documentFile.size > 0) {
        const fileExt = documentFile.name.split('.').pop();
        const fileName = `${userId}/business_proof.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('vendor-documents')
            .upload(fileName, documentFile, {
                upsert: true
            });

        if (uploadError) {
            // If upload fails, we might want to delete the user or just warn?
            // For now, return error
            return { error: `Document upload failed: ${uploadError.message}` };
        }

        // Get public URL (bucket is private, so we might need signed URL, but let's store the path for now)
        documentUrl = fileName;
    }

    // 3. Create Vendor Application
    const { error: appError } = await supabase
        .from('vendor_applications')
        .insert({
            user_id: userId,
            full_name: name,
            email: email,
            store_name: storeName,
            phone: phone,
            gst_number: gst,
            business_location: location,
            documents_url: documentUrl,
            status: 'pending'
        });

    if (appError) {
        return { error: `Application failed: ${appError.message}` };
    }

    // Redirect to a success page or login
    redirect("/vendor/login?registered=true");
}
