
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Vendor Profile</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new vendor account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Full Name
                    </Label>
                    <Input id="name" name="name" placeholder="e.g. Fashionista Vendor" className="col-span-3" required/>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="vendor@example.com" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                        Password
                    </Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" className="col-span-3" required/>
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
