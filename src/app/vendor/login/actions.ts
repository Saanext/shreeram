'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function handleLogin(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login Error:", error.message);
    return redirect(`/vendor/login?error=${encodeURIComponent(error.message)}`);
  }

  // Verify Role using Secure RPC
  const { data: role, error: roleError } = await supabase.rpc('get_user_role');

  if (roleError) {
    console.error('Role Check RPC Error:', roleError);
    return redirect('/vendor/login?error=System Error checking role');
  }

  // Allow 'admin' to access vendor dashboard too? Maybe not. Strict isolation requested.
  // But usually Admin needs to 'impersonate' or debug.
  // Let's stick to strict: ONLY vendors.
  if (role !== 'vendor') {
    await supabase.auth.signOut();
    return redirect('/vendor/login?error=Unauthorized - Vendor Access Only');
  }

  redirect('/vendor/dashboard');
}
