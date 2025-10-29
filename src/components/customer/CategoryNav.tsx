
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { mockCategories } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Image from 'next/image';
import * as React from 'react';

const parentCategories = mockCategories.filter(c => !c.parentId);

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background shadow-sm sticky top-16 z-40">
      <div className="container flex items-center justify-center h-14">
        <NavigationMenu>
          <NavigationMenuList>
            {parentCategories.map((category) => {
              const subCategories = mockCategories.filter(c => c.parentId === category.id);
              return (
                <NavigationMenuItem key={category.id}>
                  <NavigationMenuTrigger>
                    <Link href={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <div className="row-span-3">
                         <NavigationMenuLink asChild>
                           <a
                             className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                             href={`/category/${category.name.toLowerCase()}`}
                           >
                             <Image src={category.imageUrl} alt={category.name} width={400} height={400} className="rounded-md object-cover mb-4 aspect-square" />
                             <div className="text-lg font-medium">{category.name}</div>
                             <p className="text-sm leading-tight text-muted-foreground">
                               Browse all products in the {category.name} collection.
                             </p>
                           </a>
                         </NavigationMenuLink>
                      </div>
                      <div className="flex flex-col gap-2">
                        {subCategories.map((sub) => (
                           <ListItem key={sub.id} href={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`} title={sub.name} />
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
