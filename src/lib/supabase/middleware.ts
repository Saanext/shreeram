import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // ROUTE PROTECTION LOGIC
    const path = request.nextUrl.pathname

    // 1. Admin Routes
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
        if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
        // Check Admin Role (Call RPC for speed and safety)
        const { data: role } = await supabase.rpc('get_user_role')

        // STRICT SEPARATION: If not admin, redirect to login (which should probably handle logout if needed)
        if (role !== 'admin') {
            // Option: Redirect to their own dashboard? Or just error on admin login?
            // Safer to send to admin login with error, user can then logout/login as admin
            const url = new URL('/admin/login', request.url)
            url.searchParams.set('error', 'Unauthorized: Admin access only')
            return NextResponse.redirect(url)
        }
    }

    // 2. Vendor Routes
    if (path.startsWith('/vendor') && !path.startsWith('/vendor/login') && !path.startsWith('/vendor/register')) {
        if (!user) {
            return NextResponse.redirect(new URL('/vendor/login', request.url))
        }
        const { data: role } = await supabase.rpc('get_user_role')

        // STRICT SEPARATION: If not vendor (and not admin debugging), redirect
        // Allowing admin to access vendor routes might be useful for debugging, but let's stick to strict for now
        // or allow admin to access if needed. The user asked for "separate login systems".
        if (role !== 'vendor') {
            const url = new URL('/vendor/login', request.url)
            url.searchParams.set('error', 'Unauthorized: Vendor access only')
            return NextResponse.redirect(url)
        }
    }

    // 3. Customer Routes (Profile etc)
    if (path.startsWith('/account')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // 4. Auth Pages (Redirect if already logged in?)
    // Optional: If user visits /admin/login but is already admin, send to dashboard
    if (path === '/admin/login' && user) {
        const { data: role } = await supabase.rpc('get_user_role')
        if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    return response
}
