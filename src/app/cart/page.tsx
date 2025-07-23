import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { CategoryNav } from '@/components/customer/CategoryNav';

const cartItems = [
  { ...mockProducts[0], quantity: 1 },
  { ...mockProducts[2], quantity: 2 },
];
const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shipping = 100.00;
const total = subtotal + shipping;

export default function CartPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-8 md:py-12">
        <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4 gap-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover w-24 h-24"
                   data-ai-hint={`${item.category} clothing`}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="number" value={item.quantity} className="w-16 text-center" />
                </div>
                <p className="font-semibold w-24 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
