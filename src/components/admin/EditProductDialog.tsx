'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadCloud, X } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useRouter } from "next/navigation";

const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    category: z.string({ required_error: "Please select a category" }),
    price: z.coerce.number().positive("Price must be a positive number"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
    isBestSeller: z.boolean().default(false),
    isOnSale: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface EditProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productId: string;
}

export function EditProductDialog({ open, onOpenChange, productId }: EditProductDialogProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [categories, setCategories] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            images: [],
            price: 0,
            stock: 0,
            isBestSeller: false,
            isOnSale: false,
        },
    });

    // Fetch categories
    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('/api/categories');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data.categories || []);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    // Fetch product data when dialog opens
    React.useEffect(() => {
        if (open && productId) {
            async function fetchProduct() {
                try {
                    setLoading(true);
                    const res = await fetch(`/api/products/${productId}`);
                    if (res.ok) {
                        const data = await res.json();
                        const product = data.product;
                        form.reset({
                            name: product.name,
                            description: product.description,
                            images: product.imageUrls,
                            category: product.categoryId,
                            price: product.price,
                            stock: product.stock,
                            isBestSeller: product.isBestSeller || false,
                            isOnSale: product.isOnSale || false,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to load product data",
                    });
                } finally {
                    setLoading(false);
                }
            }
            fetchProduct();
        }
    }, [open, productId, form, toast]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const currentImages = form.getValues('images');
                form.setValue('images', [...currentImages, reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const removeImage = (index: number) => {
        const currentImages = form.getValues('images');
        form.setValue('images', currentImages.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: ProductFormValues) => {
        try {
            const payload = {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                categoryId: data.category,
                images: data.images,
                isBestSeller: data.isBestSeller,
                isOnSale: data.isOnSale,
            };

            const res = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to update product');
            }

            toast({
                title: "Product Updated",
                description: `"${data.name}" has been successfully updated.`,
            });

            onOpenChange(false);
            router.refresh();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to update product. Please try again.",
            });
        }
    };

    const images = form.watch("images");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        Update the product details below.
                    </DialogDescription>
                </DialogHeader>
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-muted-foreground">Loading product...</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="max-h-[70vh] overflow-y-auto pr-4 pl-1 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
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
                                                <Textarea
                                                    placeholder="Describe the product..."
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Product Images</FormLabel>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    <div
                                                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                                                            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                                                        }`}
                                                        onDragOver={handleDragOver}
                                                        onDragLeave={handleDragLeave}
                                                        onDrop={handleDrop}
                                                        onClick={() => fileInputRef.current?.click()}
                                                    >
                                                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                                                        <p className="mt-2 text-sm text-muted-foreground">
                                                            Drag and drop an image, or click to select
                                                        </p>
                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleFileSelect}
                                                        />
                                                    </div>
                                                    {images && images.length > 0 && (
                                                        <div className="grid grid-cols-3 gap-4">
                                                            {images.map((img, index) => (
                                                                <div key={index} className="relative group">
                                                                    <Image
                                                                        src={img}
                                                                        alt={`Product ${index + 1}`}
                                                                        width={150}
                                                                        height={150}
                                                                        className="rounded-lg object-cover w-full h-32"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeImage(index)}
                                                                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price (₹)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" step="0.01" placeholder="999.99" {...field} />
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
                                                    <Input type="number" placeholder="100" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="isBestSeller"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="!mt-0 cursor-pointer">Best Seller</FormLabel>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="isOnSale"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="!mt-0 cursor-pointer">On Sale</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Update Product</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}

