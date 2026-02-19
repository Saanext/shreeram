
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { createClient } from "@/lib/supabase/server"
import Link from 'next/link';
import * as React from 'react';

export default async function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();

  // Fetch vendor details
  const { data: vendor, error: vendorError } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single();

  if (vendorError || !vendor) {
    notFound();
  }

  // Fetch vendor's products
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      category:categories!category_id(name)
    `)
    .eq('vendor_id', id)
    .order('created_at', { ascending: false });

  if (productsError) {
    console.error('Error fetching vendor products:', productsError);
  }

  const vendorProducts = products?.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category?.name || 'Uncategorized',
    price: p.price,
    stock: p.stock,
    imageUrls: p.image_urls || []
  })) || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/admin/vendors">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-headline font-bold">Vendor: {vendor.store_name || vendor.full_name}</h1>
          <p className="text-muted-foreground">Manage products and view details for this vendor.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Vendor's Products</CardTitle>
          <CardDescription>A list of all products managed by {vendor.store_name || vendor.full_name}.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorProducts.length > 0 ? vendorProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    {product.imageUrls.length > 0 ? (
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.imageUrls[0]}
                        width="64"
                        data-ai-hint={`${product.category} clothing`}
                      />
                    ) : (
                      <div className="aspect-square rounded-md bg-muted w-16 h-16" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">₹{product.price?.toFixed(2) || '0.00'}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    <p className="text-muted-foreground">This vendor has no products.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
