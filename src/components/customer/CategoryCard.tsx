'use client';

import type { Category } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function CategoryCard({ category, parentSlug }: { category: Category, parentSlug?: string }) {
  const categoryLink = parentSlug
    ? `/category/${parentSlug}/${category.name.toLowerCase()}`
    : `/category/${category.name.toLowerCase()}`;

  return (
    <Link href={categoryLink} className="group flex flex-col items-center w-full">
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted/30  transition-all duration-300">
        <Image
          src={category.imageUrl || '/placeholder.jpg'}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
      </div>
      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <h3 className="text-sm md:text-base font-headline font-semibold uppercase tracking-widest text-foreground transition-colors group-hover:text-gray-500">
          {category.name}
        </h3>
        <p className="mt-2 flex items-center justify-center text-xs font-medium text-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 uppercase tracking-widest">
          Shop Now <ArrowRight className="ml-1 h-3 w-3" />
        </p>
      </div>
    </Link>
  );
}
