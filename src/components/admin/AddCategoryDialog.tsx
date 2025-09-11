
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
import { PlusCircle, UploadCloud, X } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { mockCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";


const categorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
    parentId: z.string().optional(),
    image: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function AddCategoryDialog() {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    });

    const image = form.watch("image");

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                form.setValue("image", reader.result as string, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
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
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };


    const removeImage = () => {
        form.setValue("image", undefined, { shouldValidate: true });
    };

    const onSubmit = (data: CategoryFormValues) => {
        console.log("Category data:", data);
        
        toast({
            title: "Category Added",
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
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new category or subcategory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="max-h-[70vh] overflow-y-auto pr-4 pl-1 space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Footwear" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="parentId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Parent Category (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a parent category" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="none">No Parent</SelectItem>
                                        {mockCategories.filter(c => !c.parentId).map(cat => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                     <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Category Image</FormLabel>
                                {!image ? (
                                    <FormControl>
                                        <div 
                                            className={cn(
                                                "border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center transition-colors cursor-pointer",
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
                                                Drag & drop an image here, or click to select a file.
                                            </p>
                                            <Input 
                                                ref={fileInputRef}
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*" 
                                                onChange={handleFileSelect} 
                                            />
                                        </div>
                                    </FormControl>
                                ) : (
                                    <div className="relative group aspect-video">
                                        <Image src={image} alt="Category image" fill className="rounded-md object-cover" />
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={removeImage}
                                        >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Remove image</span>
                                        </Button>
                                    </div>
                                )}
                                 <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Adding...' : 'Add Category'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
