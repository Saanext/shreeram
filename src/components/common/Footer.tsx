
import Link from 'next/link';
import { Logo } from './Logo';
import { Facebook, Twitter, Instagram, ShieldCheck, RefreshCw } from 'lucide-react';
import { Separator } from '../ui/separator';

export function Footer() {
  const usefulLinks = [
    { href: '/account', label: 'Your Account' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/#', label: 'FAQ' },
    { href: '/#', label: 'Terms Of Use' },
    { href: '/#', label: 'Track Orders' },
    { href: '/#', label: 'Shipping' },
    { href: '/#', label: 'Cancellation' },
    { href: '/#', label: 'Returns' },
  ];

  return (
    <footer className="bg-muted/40 text-muted-foreground border-t">
      <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="font-headline text-sm font-semibold uppercase text-foreground tracking-wider">Online Shopping</h4>
            <ul className="space-y-2">
              <li><Link href="/category/men" className="text-sm hover:text-primary transition-colors">Men</Link></li>
              <li><Link href="/category/women" className="text-sm hover:text-primary transition-colors">Women</Link></li>
              <li><Link href="/category/kids" className="text-sm hover:text-primary transition-colors">Kids</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline text-sm font-semibold uppercase text-foreground tracking-wider">Useful Links</h4>
            <ul className="space-y-2">
              {usefulLinks.map(link => (
                 <li key={link.label}><Link href={link.href} className="text-sm hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline text-sm font-semibold uppercase text-foreground tracking-wider">Keep in touch</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 text-foreground shrink-0 mt-1"/>
                <div>
                    <p className="font-bold text-foreground">100% ORIGINAL</p>
                    <p className="text-sm">guarantee for all products at sreclothing.com</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <RefreshCw className="h-8 w-8 text-foreground shrink-0 mt-1"/>
                 <div>
                    <p className="font-bold text-foreground">Return within 14 days</p>
                    <p className="text-sm">of receiving your order</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
       <div className="bg-muted/60 py-4">
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <p className="text-xs text-center sm:text-left">&copy; 2024 SRE Clothing. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
            <Link href="/vendor/login" className="text-xs hover:underline underline-offset-4">
              Vendor Portal
            </Link>
            <Link href="/admin/login" className="text-xs hover:underline underline-offset-4">
              Admin Portal
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
