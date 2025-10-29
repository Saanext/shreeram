
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { mockProducts, mockCategories } from '@/lib/data';
import { ProductCard } from '@/components/customer/ProductCard';
import { notFound } from 'next/navigation';
import { Frown } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function SubCategoryPage({ params }: { params: { slug: string, subSlug: string } }) {
  const { slug, subSlug } = params;
  
  const parentCategory = mockCategories.find(c => c.name.toLowerCase() === slug.toLowerCase() && !c.parentId);
  const subCategory = mockCategories.find(c => c.name.toLowerCase() === subSlug.toLowerCase() && c.parentId === parentCategory?.id);

  if (!parentCategory || !subCategory) {
      notFound();
  }

  const products = mockProducts.filter(p => p.category.toLowerCase() === parentCategory.name.toLowerCase() && p.subCategory?.toLowerCase() === subCategory.name.toLowerCase());
  
  const parentCategoryName = parentCategory.name.charAt(0).toUpperCase() + parentCategory.name.slice(1);
  const subCategoryName = subCategory.name.charAt(0).toUpperCase() + subCategory.name.slice(1);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-8 md:py-12">
        <div className="mb-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href={`/category/${slug}`}>{parentCategoryName}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>{subCategoryName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mt-4">
                {subCategoryName}
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-2">
                Explore our curated selection of {subCategoryName.toLowerCase()} for {parentCategoryName.toLowerCase()}.
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
                <p className="mt-2 text-muted-foreground">There are currently no products available in the {subCategoryName} subcategory.</p>
            </div>
        )}
      </main>
    </div>
  );
}
