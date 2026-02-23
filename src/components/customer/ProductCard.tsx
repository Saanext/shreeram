
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
    return `${product.category} ${product.name}`.toLowerCase().split(" ").slice(0, 2).join(" ");
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

  // Use slug if available, otherwise fall back to ID
  const productDetailLink = product.slug ? `/products/${product.slug}` : `/products/${product.id}`;

  return (
    <Card
      className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out group border-none shadow-none rounded-none bg-transparent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader className="p-0 border-none relative overflow-hidden bg-gray-50">
        <Link href={productDetailLink} className="block overflow-hidden aspect-[3/4]">
          <Image
            src={currentImage}
            alt={product.name}
            width={600}
            height={800}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-[1.03]"
            data-ai-hint={getProductHint(product)}
          />
        </Link>
        {product.isOnSale && (
          <Badge className="absolute top-4 right-4 rounded-none bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wider text-[10px] uppercase px-3 py-1">Sale</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col items-center text-center">
        {product.subCategory ? (
          <Link href={productLink}>
            <span className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-black transition-colors">{product.subCategory}</span>
          </Link>
        ) : product.category && (
          <Link href={productLink}>
            <span className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-black transition-colors">{product.category}</span>
          </Link>
        )}
        <Link href={productDetailLink}>
          <CardTitle className="text-base md:text-lg font-headline font-semibold uppercase tracking-wide leading-tight hover:text-gray-500 transition-colors mt-1">
            {product.name}
          </CardTitle>
        </Link>
        <div className="flex-grow mt-2">
          <p className={cn("text-gray-500 text-sm font-light transition-all duration-300", isExpanded ? "max-h-full" : "max-h-10 overflow-hidden")}>
            {product.description}
          </p>
          {isLongDescription && (
            <button onClick={toggleDescription} className="text-black text-xs uppercase tracking-widest hover:underline mt-2 font-medium">
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <p className="text-lg font-medium text-black">₹{product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className="w-full rounded-none border-black text-black hover:bg-black hover:text-white uppercase tracking-widest text-xs transition-colors py-5"
        >
          <ShoppingCart className="mr-2 h-3 w-3" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
