
'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(product.imageUrls[0]);

  const handleMouseEnter = () => {
    if (product.imageUrls.length > 1) {
      setCurrentImage(product.imageUrls[1]);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(product.imageUrls[0]);
  };
  
  const getProductHint = (product: Product) => {
    return `${product.category} ${product.name}`.toLowerCase().split(" ").slice(0,2).join(" ");
  }
  
  const handleAddToCart = () => {
    addToCart(product);
  }
  
  const toggleDescription = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const isLongDescription = product.description.length > 100;
  
  const productLink = product.subCategory 
    ? `/category/${product.category.toLowerCase()}/${product.subCategory.toLowerCase()}`
    : `/category/${product.category.toLowerCase()}`;


  return (
    <Card 
      className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg duration-300 ease-in-out group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader className="p-0 border-b relative">
         <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-square">
            <Image
                src={currentImage}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                data-ai-hint={getProductHint(product)}
            />
         </Link>
          {product.isOnSale && (
            <Badge variant="destructive" className="absolute top-2 right-2">Sale</Badge>
          )}
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        {product.subCategory ? (
            <Link href={productLink}>
                <Badge variant="secondary" className="mb-2 font-semibold w-fit hover:bg-primary/10 transition-colors">{product.subCategory}</Badge>
            </Link>
        ) : product.category && (
            <Link href={productLink}>
                <Badge variant="secondary" className="mb-2 font-semibold w-fit hover:bg-primary/10 transition-colors">{product.category}</Badge>
            </Link>
        )}
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-headline leading-tight hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <div className="flex-grow">
          <p className={cn("text-muted-foreground text-sm mt-1 transition-all duration-300", isExpanded ? "max-h-full" : "max-h-10 overflow-hidden")}>
            {product.description}
          </p>
          {isLongDescription && (
             <button onClick={toggleDescription} className="text-primary text-sm hover:underline mt-1 font-medium">
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
            {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toFixed(2)}</p>
            )}
        </div>
        <Button size="sm" disabled={product.stock === 0} onClick={handleAddToCart} className="w-full sm:w-auto">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
