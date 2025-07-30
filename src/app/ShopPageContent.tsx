
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { ProductCard } from '@/components/customer/ProductCard';
import { mockProducts } from '@/lib/data';
import { ArrowRight, Flame, Tag, Star, Frown, Truck, ShieldCheck, Headset } from 'lucide-react';
import Image from 'next/image';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { ScrollAnimation } from '@/components/common/ScrollAnimation';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AnimatedDivider } from '@/components/common/AnimatedDivider';
import { FeatureCard } from '@/components/customer/FeatureCard';


export function ShopPageContent() {
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
  
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  
  const heroImages = [
    { src: '/banner1.png', hint: 'fashion clothing family' },
    { src: '/banner2.png', hint: 'woman dress' },
    { src: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3b21lbiUyMGplYW5zfGVufDB8fHx8MTc1MzM2MDAzNXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'woman jeans' },
    { src: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzaGlydHxlbnwwfHx8fDE3NTMzNTk4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'cotton shirt' },
  ];


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
            <section className="w-full relative">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                    {heroImages.map((image, index) => (
                        <CarouselItem key={index}>
                        <div className="relative h-[60vh] md:h-[80vh] w-full">
                            <Image
                                src={image.src}
                                data-ai-hint={image.hint}
                                alt="Hero Banner Image"
                                fill
                                className="object-cover brightness-75"
                                priority={index === 0}
                            />
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                </Carousel>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                    <div className="container px-4 md:px-6 text-center text-primary-foreground space-y-4">
                        <ScrollAnimation>
                        <div className="flex justify-center gap-2 min-[400px]:flex-row">
                            <Button asChild size="lg" variant="secondary" className="group">
                                <Link href="#products">
                                    Shop Now
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>
            
            <div className="bg-muted/30">
                <div className="container px-4 md:px-6 py-12">
                    <ScrollAnimation>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <FeatureCard 
                                icon={Truck}
                                title="Free Shipping"
                                description="On all orders over ₹2000. Get your products delivered to your doorstep without any extra cost."
                            />
                            <FeatureCard 
                                icon={ShieldCheck}
                                title="Secure Payments"
                                description="Your transactions are safe with us. We use the latest encryption technology."
                            />
                            <FeatureCard 
                                icon={Tag}
                                title="Exclusive Offers"
                                description="Sign up for our newsletter to receive special discounts and early access to sales."
                            />
                            <FeatureCard 
                                icon={Headset}
                                title="24/7 Support"
                                description="Our customer support team is here to help you around the clock with any queries."
                            />
                        </div>
                    </ScrollAnimation>
                </div>
            </div>


            <AnimatedDivider />

            <section id="products" className="w-full pb-12 md:pb-24 lg:pb-32">
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

            <AnimatedDivider />

            <section id="best-sellers" className="w-full pb-12 md:pb-24 lg:pb-32 bg-muted/20">
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
                 <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {bestSellers.map((product) => (
                        <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                           <div className="p-1 h-full">
                            <ProductCard product={product} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
              </div>
            </section>

             <AnimatedDivider />
             
            <section className="w-full">
              <ScrollAnimation>
                <div className="container px-4 md:px-6">
                  <div className="relative rounded-xl overflow-hidden py-24 px-8 flex items-center justify-center text-center bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg')"}}>
                    <div className="absolute inset-0 bg-black/50 z-0"></div>
                    <div className="relative z-10 space-y-4 max-w-2xl">
                        <h2 className="text-4xl font-headline font-bold text-white sm:text-5xl md:text-6xl">Kid's Collection</h2>
                        <p className="text-lg text-white/90">
                            Explore our latest collection for kids. Fun, stylish, and comfortable clothes for every occasion.
                        </p>
                        <Button asChild size="lg" variant="secondary">
                           <Link href="/category/kids">Shop Kid's Wear <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </section>

             <AnimatedDivider />

            <section id="on-sale" className="w-full pb-12 md:pb-24 lg:pb-32">
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
