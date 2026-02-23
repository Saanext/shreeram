'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { ProductCard } from '@/components/customer/ProductCard';
import { ArrowRight, Tag, Star, Frown, Truck, ShieldCheck, Headset } from 'lucide-react';
import { ScrollAnimation } from '@/components/common/ScrollAnimation';
import { TextReveal } from '@/components/common/TextReveal';
import { Marquee } from '@/components/common/Marquee';
import { ImageReveal } from '@/components/common/ImageReveal';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
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
            <section className="w-full relative bg-white">
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
                      <div className="relative w-full min-h-[70vh] md:h-[85vh] lg:h-[90vh] flex flex-col-reverse md:flex-row bg-white">
                        {/* Text Content */}
                        <div className="w-full md:w-1/2 lg:w-5/12 flex items-center justify-start md:justify-center p-8 sm:p-12 md:p-16 lg:p-24 z-10 bg-white">
                          <div className="w-full max-w-xl overflow-hidden">
                            <TextReveal
                              text={slide.title}
                              elementType="h1"
                              className="font-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter uppercase text-black leading-tight"
                            />
                            <div className="mt-4 lg:mt-6">
                              <TextReveal
                                text={slide.description}
                                elementType="p"
                                delay={0.4}
                                staggerDelay={0.02}
                                className="text-base sm:text-lg text-gray-600 font-light"
                              />
                            </div>
                            <ScrollAnimation style={{ animationDelay: '0.8s' }}>
                              <Button asChild size="lg" className="mt-8 lg:mt-10 rounded-none bg-black text-white hover:bg-gray-800 px-8 py-6 text-xs sm:text-sm tracking-widest uppercase transition-all w-full sm:w-auto">
                                <Link href={slide.buttonLink}>
                                  {slide.buttonText}
                                  <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                              </Button>
                            </ScrollAnimation>
                          </div>
                        </div>

                        {/* Image Content */}
                        <ImageReveal className="relative w-full md:w-1/2 lg:w-7/12 h-[45vh] md:h-full">
                          <Image
                            src={slide.src}
                            data-ai-hint={slide.hint}
                            alt="Hero Banner Image"
                            fill
                            className="object-cover"
                            priority={index === 0}
                          />
                        </ImageReveal>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex left-8 text-black border-black bg-white hover:bg-black hover:text-white h-12 w-12 rounded-none transition-colors" />
                <CarouselNext className="hidden md:flex right-8 text-black border-black bg-white hover:bg-black hover:text-white h-12 w-12 rounded-none transition-colors" />
              </Carousel>
            </section>

            <Marquee text="NEW SEASON • LIMITED CAPSULE • EXCLUSIVE DROPS • FAST SHIPPING • PREMIUM QUALITY • " speed={25} />

            <section id="on-sale" className="w-full py-20 md:py-32 bg-white">
              <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
                <ScrollAnimation>
                  <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20 border-b border-gray-200 pb-12">
                    <div className="inline-block border border-black text-black px-6 py-2 text-xs uppercase tracking-widest font-semibold">
                      Limited Time Deals
                    </div>
                    <h2 className="font-headline text-4xl md:text-5xl uppercase tracking-widest font-bold">
                      The Sale Edit
                    </h2>
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

            <div className="bg-white border-y border-gray-200">
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

            <section className="w-full py-24 md:py-32 bg-white">
              <ScrollAnimation>
                <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
                  <div className="border border-gray-200 bg-white shadow-sm p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 group transition-shadow hover:shadow-md">
                    <div className="flex items-start md:items-center gap-8 flex-col md:flex-row">
                      <div className="relative h-24 w-36 shadow-lg rotate-[-2deg] transform transition-transform group-hover:rotate-0">
                        <Image
                          src="https://picsum.photos/seed/creditcard/400/250"
                          alt="Credit Card Offer"
                          fill
                          className="rounded-sm object-cover grayscale opacity-90 transition-all group-hover:grayscale-0"
                          data-ai-hint="black minimalist credit card"
                        />
                      </div>
                      <div className="hidden md:block h-24 w-px bg-gray-200" />
                      <div>
                        <h3 className="font-headline text-xs uppercase tracking-widest text-gray-500 mb-2">Partner Offer</h3>
                        <h4 className="font-headline font-bold text-3xl md:text-4xl text-black uppercase tracking-tight">Flat 7.5% Cashback</h4>
                        <p className="text-gray-600 mt-2 font-light">On SRE AXIS BANK Credit Card via <span className="font-medium text-black">Cred</span></p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                      <Button variant="outline" className="rounded-none border-black text-black hover:bg-black hover:text-white px-8 py-6 w-full md:w-auto tracking-widest uppercase transition-colors">
                        Apply Now
                      </Button>
                      <p className="mt-4 text-xs text-gray-400">
                        *Terms & Conditions Apply
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </section>

            <section id="products" className="w-full py-20 md:py-32 bg-white">
              <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
                <ScrollAnimation>
                  <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20 border-b border-gray-200 pb-12">
                    <div className="inline-block border border-black text-black px-6 py-2 text-xs uppercase tracking-widest font-semibold">
                      New Arrivals
                    </div>
                    <h2 className="font-headline text-4xl md:text-5xl uppercase tracking-widest font-bold">
                      The Latest
                    </h2>
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

            <section id="best-sellers" className="w-full py-20 md:py-32 bg-gray-50 border-t border-gray-200">
              <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
                <ScrollAnimation>
                  <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20 border-b border-gray-300 pb-12">
                    <div className="inline-block border border-black text-black px-6 py-2 text-xs uppercase tracking-widest font-semibold">
                      Essentials
                    </div>
                    <h2 className="font-headline text-4xl md:text-5xl uppercase tracking-widest font-bold">
                      Modern Classics
                    </h2>
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
