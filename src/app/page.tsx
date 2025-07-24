
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { ProductCard } from '@/components/customer/ProductCard';
import { mockProducts } from '@/lib/data';
import { ArrowRight, Flame, Tag, Star } from 'lucide-react';
import Image from 'next/image';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { ScrollAnimation } from '@/components/common/ScrollAnimation';

export default function ShopPage() {
  const featuredProducts = mockProducts.slice(0, 4);
  const bestSellers = mockProducts.filter(p => p.isBestSeller);
  const onSaleProducts = mockProducts.filter(p => p.isOnSale);


  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <ScrollAnimation>
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Latest Trends for Everyone
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore our curated collection of stylish apparel for men, women, and kids.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="#products">
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://images.pexels.com/photos/26297709/pexels-photo-26297709.jpeg"
                data-ai-hint="fashion clothing family"
                alt="Hero"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
            </ScrollAnimation>
          </div>
        </section>

        <section id="products" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <ScrollAnimation>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">New Arrivals</div>
                  <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Featured Products
                  </h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                      Check out our latest collection of products. Fresh styles, updated daily.
                  </p>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="best-sellers" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <ScrollAnimation>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm font-medium flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Top Picks
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Best Sellers
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Discover our most popular products, loved by customers like you.
                </p>
            </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="on-sale" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <ScrollAnimation>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-destructive/10 text-destructive px-3 py-1 text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Limited Time Deals
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Grab Them While They're Hot
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Don't miss out on these special deals. Grab them before they're gone!
                </p>
            </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {onSaleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Shree Ram Enterprise. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/admin/login" className="text-xs hover:underline underline-offset-4">
            Admin Portal
          </Link>
        </nav>
      </footer>
    </div>
  );
}
