
'use client';

import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Truck } from 'lucide-react';
import * as React from 'react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  const FREE_SHIPPING_THRESHOLD = 2000;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 100.00;
  const total = subtotal + shipping;
  const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-50/50">
      <CustomerHeader />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Your Cart</h1>
          <span className="text-neutral-500 font-medium">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
            <div className="space-y-6">
              {/* Free Shipping Progress */}
              <Card className="border-none shadow-sm bg-gradient-to-r from-orange-50 to-orange-100/50 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Truck className="w-24 h-24 text-orange-600" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-3 text-sm font-medium">
                    <span className="flex items-center gap-2 text-orange-900">
                      <Truck className="w-4 h-4" />
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? "You've unlocked Free Shipping!" : `Spend ₹${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for Free Shipping`}
                    </span>
                    <span className="text-orange-700">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-orange-200" indicatorClassName="bg-orange-600" />
                </CardContent>
              </Card>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-neutral-100 transition-all hover:shadow-md hover:border-orange-100">
                    <div className="relative w-full sm:w-32 aspect-[3/4] sm:aspect-square rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-neutral-900 leading-tight">{item.name}</h3>
                        <p className="text-sm text-neutral-500 capitalize">{item.category}</p>
                        <div className="text-orange-600 font-bold text-lg mt-1">₹{item.price.toFixed(2)}</div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:text-orange-600 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:text-orange-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px] hidden sm:block">
                          <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky top-24">
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <CardHeader className="bg-neutral-900 text-white p-6">
                  <CardTitle className="text-xl font-light tracking-wide">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-neutral-900">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Shipping</span>
                      <span className={cn("font-medium", shipping === 0 ? "text-green-600" : "text-neutral-900")}>
                        {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <Separator className="bg-neutral-100" />

                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-medium text-neutral-500">Total</span>
                    <span className="text-3xl font-bold text-neutral-900 tracking-tight">₹{total.toFixed(2)}</span>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-lg text-xs text-neutral-500 space-y-2">
                    <p>• Secure Checkout</p>
                    <p>• 14-Day Returns</p>
                  </div>

                  <Button asChild className="w-full h-14 text-lg font-medium bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 group">
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in-50 duration-500">
              <ShoppingCart className="h-12 w-12 text-neutral-400" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Your cart is empty</h2>
            <p className="text-neutral-500 max-w-md mb-8">
              Looks like you haven't added anything to your cart yet. Discover our new arrivals and find something you love.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 h-12 bg-neutral-900 text-white hover:bg-neutral-800">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
