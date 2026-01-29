import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-8 md:py-12">
        <div className="mb-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Your Wishlist</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-xl bg-muted/30">
          <Heart className="mx-auto h-24 w-24 text-muted-foreground/30" />
          <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">
            See something you like? Add it to your wishlist to save it for later.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
