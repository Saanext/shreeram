'use client';

import type { Category } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';

export function CategoryCard({ category, parentSlug }: { category: Category, parentSlug?: string }) {
  const categoryLink = parentSlug 
    ? `/category/${parentSlug}/${category.name.toLowerCase()}` 
    : `/category/${category.name.toLowerCase()}`;

  return (
    <Link href={categoryLink} className="group relative block overflow-hidden rounded-xl bg-muted/30 p-4 text-center transition-all duration-300 hover:bg-muted/60 hover:shadow-lg">
        <div className="flex flex-col items-center justify-center h-full aspect-square">
            <div className="flex-grow flex items-center justify-center">
                 <CategoryIcon name={category.name} className="h-20 w-20 md:h-24 md:w-24 text-foreground/60 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
            </div>
            <h3 className="mt-4 text-lg md:text-xl font-headline font-bold text-foreground">{category.name}</h3>
            <p className="mt-1 flex items-center justify-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Shop Now <ArrowRight className="ml-1 h-4 w-4" />
            </p>
        </div>
    </Link>
  );
}
