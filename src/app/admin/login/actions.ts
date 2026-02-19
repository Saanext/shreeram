'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function handleLogin(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('--- Admin Login Attempt ---');
  console.log('Email:', email);

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('SignIn Error:', error.message);
    return redirect('/admin/login?error=' + error.message);
  }

  console.log('SignIn Success. User ID:', signInData.user?.id);

  // Verify Role
  const { data: admin, error: adminError } = await supabase
    .from('admins')
    .select('id')
    .eq('id', signInData.user?.id)
    .single();

  if (adminError) {
    console.error('Admin Check DB Error:', adminError);
  }

  if (!admin) {
    console.error('User NOT found in admins table. Access Denied.');
    await supabase.auth.signOut();
    return redirect('/admin/login?error=Unauthorized - ID not in Admins table');
  }

  console.log('Admin Verified. Redirecting to Dashboard...');
  redirect('/admin/dashboard');
}
