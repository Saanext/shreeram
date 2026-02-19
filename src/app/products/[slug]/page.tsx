'use client';

import { notFound } from 'next/navigation';
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, Star, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { ProductImageGallery } from '@/components/customer/ProductImageGallery';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import * as React from 'react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { SizeChartDialog } from '@/components/customer/SizeChartDialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { createClient } from '@/lib/supabase/client';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [vendor, setVendor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Fetch product data from API
  React.useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    async function fetchProduct() {
      try {
        setLoading(true);
        const supabase = createClient();

        // Try fetching by slug
        let { data, error } = await supabase
          .from('products')
          .select(`
                *,
                category:categories!category_id(name),
                vendor:vendors!vendor_id(full_name, store_name)
            `)
          .eq('slug', slug)
          .single();

        // Fallback: if not found and looks like UUID, try ID (for backward compatibility)
        if ((!data || error) && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
          const { data: dataById, error: errorById } = await supabase
            .from('products')
            .select(`
                    *,
                    category:categories!category_id(name),
                    vendor:vendors!vendor_id(full_name, store_name)
                `)
            .eq('id', slug)
            .single();

          if (dataById) {
            data = dataById;
            error = errorById;
          }
        }

        if (error || !data) {
          console.error('Error fetching product:', error);
          setErrorMsg(error?.message || 'Product not found in database');
          setProduct(null); // Ensure product is null on error
          return;
        }

        // Map to Product type
        const mappedProduct: Product = {
          id: data.id,
          name: data.name,
          description: data.description || '',
          price: data.price,
          originalPrice: data.original_price,
          category: data.category?.name || 'Uncategorized',
          subCategory: data.sub_category,
          stock: data.stock,
          imageUrls: data.image_urls || [],
          vendorId: data.vendor_id || '',
          isBestSeller: data.is_best_seller,
          isOnSale: data.is_on_sale,
          sizes: data.sizes,
          details: data.details,
          sizeChartImageUrl: data.size_chart_url,
          slug: data.slug
        };

        setProduct(mappedProduct);

        // Handle vendor display logic
        // If vendor_id is null, it's an admin product -> Sold by Shreeram
        // If vendor_id exists but vendor data is missing -> Unknown Vendor (shouldn't happen ideally)
        let vendorName = 'Unknown Vendor';
        let vendorId = data.vendor_id;

        if (!data.vendor_id) {
          // Admin product
          vendorName = 'Shreeram';
        } else if (data.vendor) {
          // Vendor product
          vendorName = data.vendor.store_name || data.vendor.full_name || 'Unknown Vendor';
        }

        setVendor({
          id: vendorId,
          name: vendorName
        });

      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <CustomerHeader />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-muted-foreground">Loading product...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <CustomerHeader />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <p className="text-xl font-semibold">Product not found</p>
            <p className="text-sm text-muted-foreground">Slug requested: {slug}</p>
            {/* Debugging info - remove later */}
            <div className="p-4 bg-muted rounded-md text-xs font-mono max-w-lg overflow-auto">
              <p>Status: Product is null</p>
            </div>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        variant: "destructive",
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
      });
      return;
    }
    addToCart(product!);
  }

  const discount = product?.originalPrice && product?.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-[_1.1fr,_1fr] gap-8 lg:gap-16">
          <ProductImageGallery product={product} />
          <div className="flex flex-col gap-5 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/category/${product.category?.toLowerCase() || 'all'}`}>{product.category}</BreadcrumbLink>
                </BreadcrumbItem>
                {product.subCategory && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/category/${product.category?.toLowerCase() || 'all'}/${product.subCategory.toLowerCase()}`}>{product.subCategory}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div>
              <h1 className="font-headline text-2xl md:text-3xl font-bold">{product.name}</h1>
              <p className="text-lg text-muted-foreground mt-1">{product.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border rounded-md p-1 px-2">
                <span className="font-semibold">4.1</span>
                <Star className="w-4 h-4 text-green-500 fill-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">(123 reviews)</span>
            </div>

            <Separator />

            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">MRP ₹{product.originalPrice.toFixed(2)}</span>
                )}
                {discount > 0 && (
                  <span className="text-lg font-bold text-destructive">({discount}% OFF)</span>
                )}
              </div>
              <p className="text-sm font-semibold text-green-600 mt-1">inclusive of all taxes</p>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold uppercase text-foreground">Select Size</h3>
                  {product.sizeChartImageUrl && (
                    <SizeChartDialog imageUrl={product.sizeChartImageUrl} />
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => setSelectedSize(size)}
                      className="h-12 w-12 rounded-full font-bold text-base"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button size="lg" disabled={product.stock === 0} onClick={handleAddToCart} className="flex-1 h-14 text-base">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Bag
              </Button>
              <Button size="lg" variant="outline" className="flex-1 h-14 text-base">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
            </div>

            <Separator />

            {product.details && (
              <div className="space-y-3">
                <h3 className="text-base font-bold uppercase text-foreground">Product Details</h3>
                <ul className="space-y-1 text-muted-foreground">
                  {Object.entries(product.details).map(([key, value]) => (
                    <li key={key} className="flex">
                      <span className="w-24 font-semibold text-foreground">{key}</span>
                      <span>{String(value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {vendor && (
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Sold by {vendor.id ? (
                    <Link href={`/vendor/${vendor.id}`} className="text-primary font-semibold hover:underline">
                      {vendor.name}
                    </Link>
                  ) : (
                    <span className="text-primary font-semibold">{vendor.name}</span>
                  )}
                </span>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
