
import * as React from 'react';
import { Suspense } from 'react';
import { ShopPageContent } from './ShopPageContent';
import { Skeleton } from '@/components/ui/skeleton';

function SearchResultsSkeleton() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="aspect-square w-full" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-8 w-full mt-2" />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}


export default function ShopPage() {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <ShopPageContent />
    </Suspense>
  );
}
