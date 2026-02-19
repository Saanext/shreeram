'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // Type-casting here for simplicity, but in a real app use Zod validation
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: 'customer' // DEFAULT ROLE
            }
        }
    })

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account') // Or to verification page if email confirm enabled
}
