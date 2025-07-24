
'use client';

import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';

// This is a placeholder page. The error was likely caused by this file not existing.
// By creating it and handling params correctly, we resolve the issue.
export default function VendorProductEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-headline font-bold">Edit Product</h1>
        <p className="text-muted-foreground">Update details for {product.name}.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Make changes to the product information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" defaultValue={product.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea id="product-description" defaultValue={product.description} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="product-price">Price</Label>
                <Input id="product-price" type="number" defaultValue={product.price} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="product-stock">Stock</Label>
                <Input id="product-stock" type="number" defaultValue={product.stock} />
                </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
