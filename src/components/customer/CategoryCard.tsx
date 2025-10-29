
'use client';

import type { Category } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CategoryCard({ category, parentSlug }: { category: Category, parentSlug?: string }) {
  const categoryLink = parentSlug 
    ? `/category/${parentSlug}/${category.name.toLowerCase()}` 
    : `/category/${category.name.toLowerCase()}`;

  return (
    <Link href={categoryLink} className="group relative block overflow-hidden rounded-xl">
      <div className="aspect-w-4 aspect-h-3">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={`${category.name.toLowerCase()} fashion`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white w-full">
        <h3 className="text-lg md:text-xl font-headline font-bold">{category.name}</h3>
        <p className="mt-1 flex items-center text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Shop Now <ArrowRight className="ml-1 h-4 w-4" />
        </p>
      </div>
    </Link>
  );
}
