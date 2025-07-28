
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { mockProducts } from '@/lib/data';
import { ProductCard } from '@/components/customer/ProductCard';
import { notFound } from 'next/navigation';
import { Frown } from 'lucide-react';

const validCategories = ['men', 'women', 'kids'];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  if (!validCategories.includes(slug.toLowerCase())) {
      notFound();
  }

  const products = mockProducts.filter(p => p.category.toLowerCase() === slug.toLowerCase());
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-12 md:py-16">
        <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                {categoryName}'s Collection
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-2">
                Explore our curated selection of apparel for {categoryName.toLowerCase()}.
            </p>
        </div>
        {products.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
             <div className="text-center py-20">
                <Frown className="mx-auto h-24 w-24 text-muted-foreground/30" />
                <h2 className="mt-6 text-2xl font-semibold">No products found</h2>
                <p className="mt-2 text-muted-foreground">There are currently no products available in the {categoryName} category.</p>
            </div>
        )}
      </main>
    </div>
  );
}
