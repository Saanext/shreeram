
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
import { Checkbox } from "../ui/checkbox";

const roles = [
    { id: 'products', label: 'Manage Products' },
    { id: 'vendors', label: 'Manage Vendors' },
    { id: 'customers', label: 'Manage Customers' },
    { id: 'orders', label: 'Manage Orders' },
    { id: 'settings', label: 'Manage Settings' },
]

export function AddSubAdminDialog() {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // In a real app, you would handle form submission here,
        // likely with a server action to add the sub-admin to the database.
        
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');

        toast({
            title: "Sub-Admin Created",
            description: `The account for ${name} has been created.`,
        });
        setOpen(false); // Close the dialog on successful submission
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Sub-Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Sub-Admin</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new sub-administrator account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                <div className="space-y-2">
                    <Label htmlFor="name">
                        Full Name
                    </Label>
                    <Input id="name" name="name" placeholder="e.g. Test Admin" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" name="job-title" placeholder="e.g. Marketing Manager" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">
                        Email Address
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="subadmin@example.com" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 12345 67890" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">
                        Temporary Password
                    </Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" required/>
                </div>
                <div className="space-y-4">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                        {roles.map(role => (
                            <div key={role.id} className="flex items-center space-x-2">
                                <Checkbox id={`role-${role.id}`} name="roles" value={role.id} />
                                <label htmlFor={`role-${role.id}`} className="text-sm font-medium leading-none">
                                    {role.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Account</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
