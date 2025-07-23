'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Men', href: '/category/men' },
  { name: 'Women', href: '/category/women' },
  { name: 'Kids', href: '/category/kids' },
];

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background shadow-sm">
      <div className="container flex items-center justify-center h-12">
        <div className="flex items-center space-x-8 text-sm font-medium">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={cn(
                'relative text-muted-foreground transition-colors hover:text-primary',
                pathname === category.href && 'text-primary'
              )}
            >
              {category.name}
              {pathname === category.href && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
