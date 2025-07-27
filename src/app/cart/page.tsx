
'use client';

import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { CategoryNav } from '@/components/customer/CategoryNav';
import * as React from 'react';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  
  const shipping = cartItems.length > 0 ? 100.00 : 0;
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity)) {
        updateQuantity(productId, quantity);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-8 md:py-12">
        <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex items-center p-4 gap-4">
                  <Image
                    src={item.imageUrls[0]}
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
                    <Input 
                        type="number" 
                        defaultValue={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-16 text-center"
                        min="1"
                     />
                  </div>
                  <p className="font-semibold w-24 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
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
        ) : (
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground/30" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
