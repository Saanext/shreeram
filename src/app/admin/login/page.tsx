'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { handleLogin } from "./actions";
import Link from 'next/link';
import {
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Briefcase,
  Shield,
  LayoutGrid
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/lib/utils';


const navItems = [
  { href: '#', icon: Home, label: 'Dashboard' },
  { href: '#', icon: ShoppingCart, label: 'Orders' },
  { href: '#', icon: Package, label: 'Products' },
  { href: '#', icon: LayoutGrid, label: 'Categories' },
  { href: '#', icon: Briefcase, label: 'Vendors' },
  { href: '#', icon: Users, label: 'Customers' },
  { href: '#', icon: Shield, label: 'Sub-admins' },
  { href: '#', icon: Settings, label: 'Settings' },
]

export default function AdminLoginPage() {

    const sidebarNav = (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground'
              onClick={(e) => e.preventDefault()}
              style={{cursor: 'default'}}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.label === 'Orders' && (
                 <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  3
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-background md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo />
                </div>
                <div className="flex-1">
                    {sidebarNav}
                </div>
            </div>
        </div>
      <main className="flex flex-1 items-center justify-center bg-muted/40 p-4">
        <LoginCard
          title="Admin Portal"
          description="Enter your credentials to access the dashboard."
          userType="Admin"
          loginAction={handleLogin}
        />
      </main>
    </div>
  );
}
