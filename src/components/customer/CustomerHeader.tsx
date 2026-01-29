'use client';
import Link from 'next/link';
import { Menu, Search, User, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/Logo';
import { useCart } from '@/contexts/CartContext';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from '@/components/ui/navigation-menu';
import { mockCategories } from '@/lib/data';
import type { Category } from '@/lib/types';


const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, ...props }, ref) => {
  return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none py-1 text-muted-foreground leading-none no-underline outline-none transition-colors hover:text-foreground focus:text-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-normal leading-snug">{title}</div>
        </a>
      </NavigationMenuLink>
  );
});
ListItem.displayName = 'ListItem';


export function CustomerHeader() {
  const { cartItemCount } = useCart();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;
    router.push(searchQuery ? `/?q=${encodeURIComponent(searchQuery.trim())}` : '/');
    // Close sheet if it's open
    const sheetTrigger = document.querySelector('[data-sheet-search-trigger]');
    if (sheetTrigger instanceof HTMLElement) {
      sheetTrigger.click();
    }
  };
  
  const parentCategories = mockCategories.filter(c => !c.parentId);

  const mobileNav = (
     <nav className="grid gap-4 text-lg font-medium">
        {parentCategories.map((category) => (
            <Link key={category.id} href={`/category/${category.name.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>
                {category.name.toUpperCase()}
            </Link>
        ))}
      </nav>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-20 items-center">
        <div className="flex items-center">
            {/* Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-4/5">
                    <div className="flex h-14 items-center mb-4 -ml-4">
                        <Logo />
                    </div>
                    {mobileNav}
                </SheetContent>
            </Sheet>

            <Logo />
            
            <NavigationMenu className="ml-6 hidden md:flex">
                <NavigationMenuList>
                    {parentCategories.map(category => {
                         const subCategories = mockCategories.filter(c => c.parentId === category.id);
                         const hasSubcategories = subCategories.length > 0;
                         const isStudio = category.name.toLowerCase() === 'studio';

                         const groupedSubcategories = subCategories.reduce((acc, sub) => {
                            const groupName = sub.group || 'All';
                            if (!acc[groupName]) {
                                acc[groupName] = [];
                            }
                            acc[groupName].push(sub);
                            return acc;
                         }, {} as Record<string, Category[]>);

                         if (!hasSubcategories) {
                           return (
                              <NavigationMenuItem key={category.id}>
                                  <Link href={`/category/${category.name.toLowerCase()}`} legacyBehavior passHref>
                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-bold tracking-wider text-sm bg-transparent")}>
                                      {category.name.toUpperCase()}
                                      {isStudio && <sup className="text-xs text-red-500 font-bold ml-1">NEW</sup>}
                                    </NavigationMenuLink>
                                  </Link>
                              </NavigationMenuItem>
                           )
                         }
                         
                         return (
                            <NavigationMenuItem key={category.id}>
                                <NavigationMenuTrigger className="font-bold tracking-wider text-sm bg-transparent">
                                   <Link href={`/category/${category.name.toLowerCase()}`}>{category.name.toUpperCase()}</Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid auto-cols-max grid-flow-col gap-x-8 gap-y-4 p-6 min-w-[600px]">
                                        {Object.entries(groupedSubcategories).map(([groupName, items]) => (
                                            <div key={groupName} className="flex flex-col gap-3">
                                                <h3 className="font-bold text-sm text-primary">{groupName}</h3>
                                                <ul className="flex flex-col gap-2">
                                                    {items.map(item => (
                                                        <li key={item.id}>
                                                            <ListItem href={`/category/${category.name.toLowerCase()}/${item.name.toLowerCase()}`} title={item.name} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                         )
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <div className="flex-1 max-w-lg hidden sm:block">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        name="search" 
                        placeholder="Search for products, brands and more" 
                        className="pl-11 h-10 bg-muted/60 border-0 rounded-sm w-full focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:bg-background" 
                    />
                </form>
            </div>
            
            <div className="flex items-center space-x-4">
                 <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="sm:hidden" data-sheet-search-trigger>
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="p-4">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input name="search" placeholder="Search for products..." className="h-10 w-full" autoFocus />
                            <Button type="submit">Search</Button>
                        </form>
                    </SheetContent>
                </Sheet>

                <div className="hidden sm:flex items-center space-x-6">
                    <Link href="/account" className="flex flex-col items-center text-xs font-bold gap-0.5 hover:text-primary transition-colors">
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </Link>
                    <Link href="/wishlist" className="flex flex-col items-center text-xs font-bold gap-0.5 hover:text-primary transition-colors">
                        <Heart className="h-5 w-5" />
                        <span>Wishlist</span>
                    </Link>
                    <Link href="/cart" className="flex flex-col items-center text-xs font-bold gap-0.5 hover:text-primary transition-colors relative">
                        <ShoppingBag className="h-5 w-5" />
                        <span>Bag</span>
                        {cartItemCount > 0 && (
                            <div className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartItemCount}
                            </div>
                        )}
                    </Link>
                </div>

                {/* Mobile Cart Icon */}
                <Link href="/cart" className="relative sm:hidden">
                    <ShoppingBag className="h-6 w-6" />
                    {cartItemCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {cartItemCount}
                        </div>
                    )}
                </Link>
            </div>
        </div>
      </div>
    </header>
  );
}
