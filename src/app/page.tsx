
import * as React from 'react';
import { Suspense } from 'react';
import { ShopPageContent } from './ShopPageContent';
import { Skeleton } from '@/components/ui/skeleton';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { CategoryNav } from '@/components/customer/CategoryNav';

function LoadingFallback() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <CategoryNav />
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 flex-1">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] mb-12">
          <div className="flex flex-col justify-center space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-12 w-40 mt-4" />
          </div>
          <Skeleton className="w-full aspect-square rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function ShopPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopPageContent />
    </Suspense>
  );
}
