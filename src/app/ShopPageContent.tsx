'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { ProductCard } from '@/components/customer/ProductCard';
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

  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { createClient } = require('@/lib/supabase/client');
  const supabase = createClient();

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories!category_id(name),
            vendor:vendors!vendor_id(full_name, store_name)
          `);

        if (error) throw error;

        const mappedProducts = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: p.price,
          originalPrice: p.original_price,
          category: p.category?.name || 'Uncategorized',
          subCategory: p.sub_category,
          stock: p.stock,
          imageUrls: p.image_urls || [],
          vendorId: p.vendor_id || '',
          isBestSeller: p.is_best_seller,
          isOnSale: p.is_on_sale,
          sizes: p.sizes,
          details: p.details,
          sizeChartImageUrl: p.size_chart_url,
          slug: p.slug
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = React.useMemo(() => {
    if (!searchQuery) {
      return null;
    }
    return products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);


  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller);
  const onSaleProducts = products.filter(p => p.isOnSale);

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
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/10">
            <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                Search Results for "{searchQuery}"
              </h2>
              {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
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
                      <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[85vh]">
                        <Image
                          src={slide.src}
                          data-ai-hint={slide.hint}
                          alt="Hero Banner Image"
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                        <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white p-8 md:p-16 lg:p-24 container mx-auto">
                          <ScrollAnimation>
                            <h1 className="font-headline text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl max-w-4xl drop-shadow-lg">
                              {slide.title}
                            </h1>
                          </ScrollAnimation>
                          <ScrollAnimation style={{ animationDelay: '0.2s' }}>
                            <p className="max-w-[700px] text-lg md:text-2xl mt-6 text-gray-100 drop-shadow-md font-light">
                              {slide.description}
                            </p>
                          </ScrollAnimation>
                          <ScrollAnimation style={{ animationDelay: '0.4s' }}>
                            <Button asChild size="lg" className="mt-10 group bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105">
                              <Link href={slide.buttonLink}>
                                {slide.buttonText}
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                              </Link>
                            </Button>
                          </ScrollAnimation>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-8 text-white border-white/50 bg-black/20 hover:bg-black/40 hover:text-white h-12 w-12" />
                <CarouselNext className="right-8 text-white border-white/50 bg-black/20 hover:bg-black/40 hover:text-white h-12 w-12" />
              </Carousel>
            </section>

            <section id="on-sale" className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
              <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
                <ScrollAnimation>
                  <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <div className="inline-block rounded-full bg-destructive/10 text-destructive px-4 py-1.5 text-sm font-semibold flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4" />
                      Limited Time Deals
                    </div>
                    <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                      Grab Them While They're Hot
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                      Don't miss out on these special deals. Grab them before they're gone!
                    </p>
                  </div>
                </ScrollAnimation>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
                  {onSaleProducts.map((product) => (
                    <ScrollAnimation key={product.id}>
                      <ProductCard product={product} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>

            <div className="bg-muted/30 border-y border-border/50">
              <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-20">
                <ScrollAnimation>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
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

            <section className="w-full py-16 md:py-20">
              <ScrollAnimation>
                <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
                  <div className="p-2 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-xl transform hover:scale-[1.01] transition-transform duration-500">
                    <div className="bg-background rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="relative h-16 w-24 hidden sm:block shadow-md rotate-[-5deg] transform transition-transform hover:rotate-0">
                          <Image
                            src="https://picsum.photos/seed/creditcard/200/120"
                            alt="Credit Card Offer"
                            fill
                            className="rounded-lg object-cover"
                            data-ai-hint="credit card"
                          />
                        </div>
                        <div className="h-12 w-px bg-border hidden sm:block" />
                        <div>
                          <h3 className="font-headline font-bold text-2xl md:text-3xl text-foreground">Flat 7.5% Cashback*</h3>
                          <p className="text-base text-muted-foreground mt-1">On SRE AXIS BANK Credit Card via <span className="font-semibold text-primary">Cred</span></p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" className="border-amber-400 text-amber-600 hover:bg-amber-50 hover:text-amber-700">Apply Now</Button>
                        <p className="ml-4 text-xs text-muted-foreground/60">
                          *T&C Apply
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </section>

            <section id="products" className="w-full py-16 md:py-24 lg:py-28">
              <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
                <ScrollAnimation>
                  <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <div className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">New Arrivals</div>
                    <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                      Featured Products
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                      Check out our latest collection of products. Fresh styles, updated daily.
                    </p>
                  </div>
                </ScrollAnimation>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
                  {featuredProducts.map((product) => (
                    <ScrollAnimation key={product.id}>
                      <ProductCard product={product} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>

            <section id="best-sellers" className="w-full py-16 md:py-24 lg:py-28 bg-gradient-to-t from-background via-muted/30 to-background">
              <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
                <ScrollAnimation>
                  <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <div className="inline-block rounded-full bg-orange-500/10 text-orange-600 px-4 py-1.5 text-sm font-semibold flex items-center gap-2">
                      <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                      Top Picks
                    </div>
                    <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
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
                  <CarouselContent className="-ml-4">
                    {bestSellers.map((product) => (
                      <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                        <div className="h-full">
                          <ProductCard product={product} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0 -ml-4" />
                  <CarouselNext className="right-0 -mr-4" />
                </Carousel>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
