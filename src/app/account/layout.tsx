
'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { cn } from '@/lib/utils';
import { User, ShoppingBag, MapPin, KeyRound } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/account', icon: User, label: 'Your Profile' },
  { href: '/account/orders', icon: ShoppingBag, label: 'Your Orders' },
  { href: '/account/addresses', icon: MapPin, label: 'Your Addresses' },
  { href: '/account/security', icon: KeyRound, label: 'Login & Security' },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
         <div className="mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Your Account</h1>
        </div>
        <div className="grid md:grid-cols-[240px_1fr] gap-12">
          <aside>
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <React.Fragment key={item.label}>
                    <Link
                    href={item.href}
                    className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary font-medium',
                        (pathname === item.href || (item.href !== '/account' && pathname.startsWith(item.href))) && 'bg-muted text-primary'
                    )}
                    >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    </Link>
                     {item.href === '/account/orders' && <Separator className="my-2" />}
                </React.Fragment>
              ))}
            </nav>
          </aside>
          <div className="min-w-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
