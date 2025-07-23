import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/Logo';
import { Badge } from '../ui/badge';

export function CustomerHeader() {
  // In a real app, this would come from a context or store
  const cartItemCount = 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-10 hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="text-foreground/80 transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="/orders" className="text-foreground/80 transition-colors hover:text-foreground">
            My Orders
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0">{cartItemCount}</Badge>}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Customer Login</Link>
          </Button>
          <div className='hidden sm:block'>
            <Button asChild>
              <Link href="/vendor/login">Vendor Portal</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
