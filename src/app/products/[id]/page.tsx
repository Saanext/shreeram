
'use client';
import { mockProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Star } from 'lucide-react';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }
  
  const getProductHint = (product: {category: string, name: string}) => {
    return `${product.category} ${product.name}`.toLowerCase().split(" ").slice(0,2).join(" ");
  }

  const handleAddToCart = () => {
    addToCart(product);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex items-center justify-center bg-muted/10 rounded-lg overflow-hidden aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full h-full"
              data-ai-hint={getProductHint(product)}
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 py-4">
            <div>
              <Badge variant="secondary" className="mb-2 font-semibold">{product.category}</Badge>
              <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <Star className="w-5 h-5 fill-muted-foreground/30 text-muted-foreground/50" />
                  </div>
                  <span className="text-sm text-muted-foreground">(123 reviews)</span>
              </div>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-prose">
              {product.description}
            </p>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
              <Badge variant={product.stock > 0 ? "outline" : "destructive"} className="font-semibold">
                {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
              </Badge>
            </div>
            <div className="flex gap-4">
              <Button size="lg" disabled={product.stock === 0} onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
