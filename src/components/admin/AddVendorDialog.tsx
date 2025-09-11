
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
import { PlusCircle } from "lucide-react";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

export function AddVendorDialog() {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // In a real app, you would handle form submission here,
        // likely with a server action to add the vendor to the database.
        
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');

        toast({
            title: "Vendor Created",
            description: `The vendor account for ${name} has been created.`,
        });
        setOpen(false); // Close the dialog on successful submission
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Vendor Profile</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new vendor account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="e.g. Fashionista Vendor" required/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="vendor@example.com" required/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 12345 67890" required/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" required/>
                </div>

                 <div className="border-t my-4"></div>

                <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" name="businessName" placeholder="e.g. Threads & Co." required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input id="gstNumber" name="gstNumber" placeholder="e.g. 29ABCDE1234F1Z5" required/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea id="address" name="address" placeholder="123 Commerce Lane, Business City" required />
                </div>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" placeholder="e.g. Mumbai" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" placeholder="e.g. Maharashtra" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" name="zip" placeholder="e.g. 400001" required/>
                    </div>
                 </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Vendor</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
