'use server';

import { redirect } from 'next/navigation';

export async function handleLogin() {
  // In a real app, you'd handle auth here.
  // We'll just redirect to the admin dashboard.
  redirect('/admin/dashboard');
}
