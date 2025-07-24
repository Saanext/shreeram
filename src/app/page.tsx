
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { ProductCard } from '@/components/customer/ProductCard';
import { mockProducts } from '@/lib/data';
import { ArrowRight, Flame, Tag, Star, Frown } from 'lucide-react';
import Image from 'next/image';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { ScrollAnimation } from '@/components/common/ScrollAnimation';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  const filteredProducts = React.useMemo(() => {
    if (!searchQuery) {
      return null;
    }
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);


  const featuredProducts = mockProducts.slice(0, 4);
  const bestSellers = mockProducts.filter(p => p.isBestSeller);
  const onSaleProducts = mockProducts.filter(p => p.isOnSale);


  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1">
        {searchQuery ? (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                Search Results for "{searchQuery}"
              </h2>
              {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Frown className="mx-auto h-24 w-24 text-muted-foreground/30" />
                  <h2 className="mt-6 text-2xl font-semibold">No products found</h2>
                  <p className="mt-2 text-muted-foreground">Try a different search term or browse our categories.</p>
                  <Button asChild className="mt-6">
                    <Link href="/">Clear Search</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}
