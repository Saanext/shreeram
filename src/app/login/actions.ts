
'use server';

import { redirect } from 'next/navigation';

export async function handleCustomerLogin() {
  // In a real app, you'd handle auth here.
  // We'll just redirect to the main page.
  redirect('/');
}
