import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const getProductHint = (product: Product) => {
    return `${product.category} ${product.name}`.toLowerCase().split(" ").slice(0,2).join(" ");
  }
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg duration-300 ease-in-out group">
      <CardHeader className="p-0 border-b">
         <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-square">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                data-ai-hint={getProductHint(product)}
            />
         </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {product.category && <Badge variant="secondary" className="mb-2 font-semibold">{product.category}</Badge>}
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-headline leading-tight hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 h-10 overflow-hidden">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
            {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toFixed(2)}</p>
            )}
        </div>
        <Button size="sm" disabled={product.stock === 0} className="w-full sm:w-auto">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
