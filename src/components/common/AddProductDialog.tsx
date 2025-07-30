
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
import { useForm, Controller } from "react-hook-form";
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
    vendorId: z.string()
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductDialog({ vendorId }: { vendorId?: string }) {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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
            vendorId: vendorId
        },
    });

    const images = form.watch("images");

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            handleFiles(Array.from(files));
        }
    };

    const handleFiles = (files: File[]) => {
        const currentImages = form.getValues("images");
        const newImages: string[] = [];
        let processedCount = 0;

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    newImages.push(reader.result as string);
                    processedCount++;
                    if (processedCount === files.length) {
                       form.setValue("images", [...currentImages, ...newImages], { shouldValidate: true });
                    }
                };
                reader.readAsDataURL(file);
            }
        });
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
    };

    const onSubmit = (data: ProductFormValues) => {
        // In a real app, you would handle form submission here,
        // likely with a server action to add the product to the database.
        console.log("Product data:", data);
        
        toast({
            title: "Product Added",
            description: `"${data.name}" has been successfully added.`,
        });
        form.reset();
        setOpen(false);
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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                 <div 
                                    className={cn(
                                        "border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center transition-colors",
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
                                            <Image src={src} alt={`Product image ${index + 1}`} layout="fill" className="rounded-md object-cover" />
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
                                    <SelectItem value="Men">Men</SelectItem>
                                    <SelectItem value="Women">Women</SelectItem>
                                    <SelectItem value="Kids">Kids</SelectItem>
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
                                    <label htmlFor="isBestSeller" className="text-sm font-medium leading-none">
                                        Best Seller
                                    </label>
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
                                    <label htmlFor="isOnSale" className="text-sm font-medium leading-none">
                                        On Sale
                                    </label>
                                </FormItem>
                            )}
                        />
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
