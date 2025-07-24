
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


export function AddProductDialog() {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();
    const [images, setImages] = React.useState<string[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            handleFiles(Array.from(files));
        }
    };

    const handleFiles = (files: File[]) => {
        const newImages: string[] = [];
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    newImages.push(reader.result as string);
                    if (newImages.length === files.length) {
                        setImages(prev => [...prev, ...newImages]);
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
        if (files) {
            handleFiles(Array.from(files));
        }
    };


    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // In a real app, you would handle form submission here,
        // likely with a server action to add the product to the database.
        
        // We'll simulate a successful submission.
        toast({
            title: "Product Added",
            description: "The new product has been successfully added.",
        });
        setImages([]); // Clear images on submission
        setOpen(false); // Close the dialog on successful submission
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
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" placeholder="e.g. Men's Classic T-Shirt" className="col-span-3" required/>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Textarea id="description" placeholder="Provide a detailed product description." className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">
                        Images
                    </Label>
                    <div className="col-span-3">
                         <div 
                            className={cn(
                                "border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center transition-colors",
                                isDragging && "border-primary bg-primary/10"
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
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                        Category
                    </Label>
                    <Select>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="men">Men</SelectItem>
                            <SelectItem value="women">Women</SelectItem>
                            <SelectItem value="kids">Kids</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                        Price (₹)
                    </Label>
                    <Input id="price" type="number" placeholder="e.g. 999.00" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                        Stock
                    </Label>
                    <Input id="stock" type="number" placeholder="e.g. 100" className="col-span-3" required/>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Featured</Label>
                    <div className="col-span-3 space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isBestSeller" />
                            <label htmlFor="isBestSeller" className="text-sm font-medium leading-none">
                                Best Seller
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isOnSale" />
                            <label htmlFor="isOnSale" className="text-sm font-medium leading-none">
                                On Sale
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Product</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
