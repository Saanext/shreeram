
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
import { PlusCircle } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";


export function AddProductDialog() {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // In a real app, you would handle form submission here,
        // likely with a server action to add the product to the database.
        
        // We'll simulate a successful submission.
        toast({
            title: "Product Added",
            description: "The new product has been successfully added.",
        });
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
                    <Label htmlFor="imageUrl" className="text-right">
                        Image URL
                    </Label>
                    <Input id="imageUrl" placeholder="https://example.com/image.jpg" className="col-span-3" required/>
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
