'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { ProductCard } from '@/components/customer/ProductCard';
import { mockProducts } from '@/lib/data';
import { ArrowRight, Tag, Star, Frown, Truck, ShieldCheck, Headset } from 'lucide-react';
import Image from 'next/image';
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
  
  const heroSlides = [
    { 
      src: 'https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg', 
      hint: 'fashion clothing family',
      title: 'Discover Your Next Favorite Outfit',
      description: 'Explore our latest collection of high-quality apparel. From casual wear to formal attire, find the perfect look for any occasion.',
      buttonText: 'Shop Collection',
      buttonLink: '#products'
    },
    { 
      src: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 
      hint: 'woman dress',
      title: 'Elegance in Every Stitch',
      description: 'Discover timeless pieces and modern trends for every woman.',
      buttonText: 'Shop Women',
      buttonLink: '/category/women'
    },
    { 
      src: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3b21lbiUyMGplYW5zfGVufDB8fHx8MTc1MzM2MDAzNXww&ixlib=rb-4.1.0&q=80&w=1080', 
      hint: 'woman jeans',
      title: 'The Perfect Fit: Denim',
      description: 'Comfortable, stylish, and durable jeans for your everyday adventures.',
      buttonText: 'Explore Denim',
      buttonLink: '/category/women/jeans'
    },
    { 
      src: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzaGlydHxlbnwwfHx8fDE3NTMzNTk4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080', 
      hint: 'cotton shirt',
      title: 'Casual & Cool Cotton',
      description: 'Breathable and soft cotton wear for ultimate comfort.',
      buttonText: 'Shop Men',
      buttonLink: '/category/men'
    },
  ];


  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <main className="flex-1">
        {searchQuery ? (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="px-4 sm:px-6 lg:px-8">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                Search Results for "{searchQuery}"
              </h2>
              {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                    <ScrollAnimation key={product.id}>
                      <ProductCard product={product} />
                    </ScrollAnimation>
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
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index}>
                        <div className="relative w-full h-[60vh] md:h-[80vh]">
                            <Image
                                src={slide.src}
                                data-ai-hint={slide.hint}
                                alt="Hero Banner Image"
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                             <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                                <ScrollAnimation>
                                    <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                        {slide.title}
                                    </h1>
                                </ScrollAnimation>
                                <ScrollAnimation style={{ animationDelay: '0.2s' }}>
                                    <p className="max-w-[700px] text-lg md:text-xl mt-4">
                                        {slide.description}
                                    </p>
                                </ScrollAnimation>
                                <ScrollAnimation style={{ animationDelay: '0.4s' }}>
                                    <Button asChild size="lg" className="mt-8 group bg-white text-black hover:bg-white/90">
                                        <Link href={slide.buttonLink}>
                                            {slide.buttonText}
                                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </ScrollAnimation>
                            </div>
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 text-white border-white hover:bg-white/20 hover:text-white" />
                    <CarouselNext className="right-4 text-white border-white hover:bg-white/20 hover:text-white" />
                </Carousel>
            </section>

            <section id="on-sale" className="w-full py-12 md:py-16 lg:py-20">
              <div className="px-4 sm:px-6 lg:px-8">
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
                    <ScrollAnimation key={product.id}>
                      <ProductCard product={product} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>
            
            <div className="bg-muted/30">
                <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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

            <section className="w-full py-12 md:py-16">
              <ScrollAnimation>
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="p-1.5 rounded-xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
                    <div className="bg-background rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Image
                          src="https://picsum.photos/seed/creditcard/120/80"
                          alt="Credit Card Offer"
                          width={100}
                          height={60}
                          className="rounded-md hidden sm:block"
                          data-ai-hint="credit card"
                        />
                        <div className="h-10 w-px bg-border hidden sm:block" />
                        <div>
                          <h3 className="font-bold text-lg md:text-xl">Flat 7.5% Cashback*</h3>
                          <p className="text-sm text-muted-foreground">On SRE AXIS BANK Credit Card</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-xs text-muted-foreground/80 transform rotate-90 origin-center whitespace-nowrap">
                          *T&C Apply
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </section>
            
            <section id="products" className="w-full py-12 md:py-16 lg:py-20">
              <div className="px-4 sm:px-6 lg:px-8">
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
                    <ScrollAnimation key={product.id}>
                      <ProductCard product={product} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>

            <section id="best-sellers" className="w-full py-12 md:py-16 lg:py-20 bg-muted/20">
              <div className="px-4 sm:px-6 lg:px-8">
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
          </>
        )}
      </main>
    </div>
  );
}
