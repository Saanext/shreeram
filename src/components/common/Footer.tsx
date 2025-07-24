
import Link from 'next/link';
import { Logo } from './Logo';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Separator } from '../ui/separator';

export function Footer() {
  return (
    <footer className="bg-muted/40 text-muted-foreground border-t">
       <div className="container py-8 text-sm">
         <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-bold text-lg text-foreground mb-2">Exclusive Offers</h4>
              <p>Sign up for our newsletter and get exclusive deals and discounts sent directly to your inbox. Don't miss out!</p>
            </div>
             <div>
              <h4 className="font-bold text-lg text-foreground mb-2">Free Shipping</h4>
              <p>We offer free shipping on all orders over ₹2000. Shop now and save on delivery costs for your favorite items.</p>
            </div>
         </div>
      </div>
      <Separator />
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Logo />
            <p className="text-sm">
                A multi-faceted e-commerce platform for admins, vendors, and customers.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-headline text-lg font-semibold text-foreground">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/category/men" className="text-sm hover:text-primary transition-colors">Men</Link></li>
              <li><Link href="/category/women" className="text-sm hover:text-primary transition-colors">Women</Link></li>
              <li><Link href="/category/kids" className="text-sm hover:text-primary transition-colors">Kids</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-headline text-lg font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-headline text-lg font-semibold text-foreground">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/60 py-4">
        <div className="container flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-xs">&copy; 2024 Shree Ram Enterprise. All rights reserved.</p>
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
