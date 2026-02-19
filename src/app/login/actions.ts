
'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function handleCustomerLogin(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?error=Invalid credentials');
  }

  // Verify Role using Secure RPC
  const { data: role, error: roleError } = await supabase.rpc('get_user_role');

  if (role !== 'customer') {
    // If Admin tries to login here, maybe allow them? Or force them to use /admin/login?
    // Strict role separation means customers only.
    // But logging out a confused Admin is annoying.
    // Let's sign out if they are not a customer.
    console.warn('Non-customer login attempt at public login:', role);
    await supabase.auth.signOut();
    return redirect('/login?error=Customer Access Only');
  }

  redirect('/');
}
