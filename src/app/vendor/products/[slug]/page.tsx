'use client';

import { notFound, useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';

const productSchema = z.object({
    name: z.string().min(3, 'Product name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.coerce.number().min(0, 'Price must be a positive number'),
    originalPrice: z.coerce.number().min(0, 'Original price must be a positive number').optional(),
    stock: z.coerce.number().int().min(0, 'Stock must be a non-negative integer'),
    sizes: z.string().optional(),
    sizeChartImageUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function VendorProductEditPage() {
    const router = useRouter();
    const { toast } = useToast();
    const params = useParams();
    const slug = params?.slug as string;
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const supabase = createClient();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            originalPrice: 0,
            stock: 0,
            sizes: '',
            sizeChartImageUrl: '',
        }
    });

    useEffect(() => {
        const fetchProduct = async () => {
            // Try fetching by slug first
            let { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            // If not found by slug, and slug looks like a UUID, try fetching by ID
            if ((!data || error) && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
                const { data: dataById, error: errorById } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', slug)
                    .single();

                if (dataById) {
                    data = dataById;
                    error = errorById;
                }
            }

            if (error || !data) {
                console.error('Error fetching product:', error);
                notFound();
                return;
            }

            setProduct(data);
            // ... rest of reset logic ...
            form.reset({
                name: data.name,
                description: data.description || '',
                price: data.price,
                originalPrice: data.original_price || 0,
                stock: data.stock,
                sizes: data.sizes || '',
                sizeChartImageUrl: data.size_chart_url || '',
            });
            setLoading(false);
        };

        fetchProduct();
    }, [slug, supabase, form]);

    const onSubmit = async (data: ProductFormValues) => {
        if (!product?.id) return;

        const { error } = await supabase
            .from('products')
            .update({
                name: data.name,
                description: data.description,
                price: data.price,
                original_price: data.originalPrice,
                stock: data.stock,
                sizes: data.sizes,
                size_chart_url: data.sizeChartImageUrl
            })
            .eq('id', product.id);

        if (error) {
            toast({
                title: "Error",
                description: "Failed to update product.",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Product Updated",
            description: `${data.name} has been successfully updated.`
        });
        router.push('/vendor/products');
        router.refresh();
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-headline font-bold">Edit Product</h1>
                    <p className="text-muted-foreground">Update details for {product?.name}.</p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                            <CardDescription>Make changes to the product information below.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Men's Classic T-Shirt" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Provide a detailed product description." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price (₹)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="originalPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Original Price (MRP)</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.01" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="sizes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sizes</FormLabel>
                                        <FormControl>
                                            <Input placeholder="S, M, L, XL" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter available sizes, separated by commas.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sizeChartImageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Size Chart Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/size-chart.jpg" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
