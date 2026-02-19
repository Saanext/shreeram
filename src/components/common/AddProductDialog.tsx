
'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, UploadCloud, X } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";


const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    category: z.string({ required_error: "Please select a category" }),
    price: z.coerce.number().positive("Price must be a positive number"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
    isBestSeller: z.boolean().default(false),
    isOnSale: z.boolean().default(false),
    vendorId: z.string().optional().or(z.literal(''))
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductDialog({ vendorId }: { vendorId?: string }) {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [imageFiles, setImageFiles] = React.useState<File[]>([]);
    const [categories, setCategories] = React.useState<any[]>([]);
    const [vendors, setVendors] = React.useState<any[]>([]);
    const [loadingVendors, setLoadingVendors] = React.useState(false);

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
            vendorId: vendorId // undefined is fine here since it's optional
        },
    });

    const images = form.watch("images");

    // Fetch categories from API
    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('/api/categories');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }
        fetchCategories();
    }, []);

    // Fetch vendors if no vendorId provided (Admin Mode)
    React.useEffect(() => {
        if (!vendorId) {
            import("@/lib/supabase/client").then(({ createClient }) => {
                const supabase = createClient();
                const fetchVendors = async () => {
                    setLoadingVendors(true);
                    try {
                        const { data, error } = await supabase
                            .from('vendors')
                            .select('id, store_name, full_name, email');

                        if (error) throw error;
                        setVendors(data || []);
                    } catch (error) {
                        console.error("Failed to fetch vendors:", error);
                        toast({
                            title: "Error",
                            description: "Failed to load vendors list",
                            variant: "destructive",
                        });
                    } finally {
                        setLoadingVendors(false);
                    }
                };
                fetchVendors();
            });
        }
    }, [vendorId, toast]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            handleFiles(Array.from(files));
        }
    };

    const handleFiles = async (files: File[]) => {
        const currentImages = form.getValues("images");
        const validFiles = files.filter(file => file.type.startsWith('image/'));

        const readPromises = validFiles.map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });

        const newImages = await Promise.all(readPromises);

        form.setValue("images", [...currentImages, ...newImages], { shouldValidate: true });
        setImageFiles(prev => [...prev, ...validFiles]);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(Array.from(files));
        }
    };


    const removeImage = (index: number) => {
        const currentImages = form.getValues("images");
        form.setValue("images", currentImages.filter((_, i) => i !== index), { shouldValidate: true });
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: ProductFormValues) => {
        try {
            // Upload images first
            const uploadedImageUrls: string[] = [];

            for (const file of imageFiles) {
                const formData = new FormData();
                formData.append('file', file);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    uploadedImageUrls.push(uploadData.url);
                } else {
                    console.error("Failed to upload an image");
                    throw new Error("Failed to upload one or more images");
                }
            }

            const payload = {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                categoryId: data.category,
                vendorId: data.vendorId === 'none' || data.vendorId === 'empty' ? null : data.vendorId || null,
                images: uploadedImageUrls, // Use the uploaded URLs
                isBestSeller: data.isBestSeller,
                isOnSale: data.isOnSale,
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to add product');
            }

            toast({
                title: "Product Added",
                description: `"${data.name}" has been successfully added.`,
            });

            form.reset();
            setImageFiles([]);
            setOpen(false);

            // Refresh the page to show the new product
            window.location.reload();
        } catch (error) {
            console.error('Error adding product:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to add product",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new product to the catalog.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="max-h-[70vh] overflow-y-auto pr-4 pl-1 space-y-4">
                            {/* Vendor Selection (Only for Admin) */}
                            {!vendorId && (
                                <FormField
                                    control={form.control}
                                    name="vendorId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vendor</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a vendor (Optional)" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">No Vendor (Platform Product)</SelectItem>
                                                    {loadingVendors ? (
                                                        <SelectItem value="loading" disabled>Loading vendors...</SelectItem>
                                                    ) : vendors.length > 0 ? (
                                                        vendors.map((vendor) => (
                                                            <SelectItem key={vendor.id} value={vendor.id}>
                                                                {vendor.store_name || vendor.full_name || vendor.email || "Unknown Vendor"}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="empty" disabled>No vendors found</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

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
                                            <Textarea placeholder="Provide a detailed product description." {...field} />
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
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <div
                                                className={cn(
                                                    "border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center transition-colors cursor-pointer",
                                                    isDragging && "border-primary bg-primary/10",
                                                    form.formState.errors.images && "border-destructive"
                                                )}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Drag & drop images here, or click to select files.
                                                </p>
                                                <Input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleFileSelect}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        {images.length > 0 && (
                                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                                {images.map((src, index) => (
                                                    <div key={index} className="relative group aspect-square">
                                                        <Image src={src} alt={`Product image ${index + 1}`} fill className="rounded-md object-cover" />
                                                        <Button
                                                            type="button"
                                                            size="icon"
                                                            variant="destructive"
                                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={() => removeImage(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                            <span className="sr-only">Remove image</span>
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.length > 0 ? (
                                                    categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="loading" disabled>
                                                        Loading categories...
                                                    </SelectItem>
                                                )}
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
                                                <Input type="number" placeholder="e.g. 999.00" {...field} />
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
                                                <Input type="number" placeholder="e.g. 100" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Featured</Label>
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
                                                <Label htmlFor="isBestSeller" className="font-normal">
                                                    Best Seller
                                                </Label>
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
                                                <Label htmlFor="isOnSale" className="font-normal">
                                                    On Sale
                                                </Label>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Adding...' : 'Add Product'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
