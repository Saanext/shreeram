
'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const getProductHint = (product: Product) => {
    return `${product.category} ${product.name}`.toLowerCase().split(' ').slice(0, 2).join(' ');
  };

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {product.imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted/10">
                   <Image
                    src={url}
                    alt={`${product.name} - view ${index + 1}`}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={getProductHint(product)}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>

       {product.imageUrls.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
            {product.imageUrls.map((url, index) => (
                <button
                    key={index}
                    onClick={() => handleThumbClick(index)}
                    className={cn(
                        "overflow-hidden rounded-lg aspect-square transition-all duration-200",
                        "ring-2 ring-offset-2 ring-offset-background",
                        current === index ? "ring-primary" : "ring-transparent hover:ring-muted-foreground/50"
                    )}
                >
                    <Image
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                    />
                     <span className="sr-only">View image {index + 1}</span>
                </button>
            ))}
        </div>
      )}
    </div>
  );
}
