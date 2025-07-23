import { mockProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Star } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex items-center justify-center bg-muted/20 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full h-full aspect-square"
              data-ai-hint="product image"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
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
            <p className="text-muted-foreground text-base leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
              <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
              </Badge>
            </div>
            <div className="flex gap-4">
              <Button size="lg" disabled={product.stock === 0}>
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
