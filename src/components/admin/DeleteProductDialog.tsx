'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import * as React from "react";

interface DeleteProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productId: string;
    productName: string;
}

export function DeleteProductDialog({ open, onOpenChange, productId, productName }: DeleteProductDialogProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to delete product');
            }

            toast({
                title: "Product Deleted",
                description: `"${productName}" has been successfully deleted.`,
            });

            onOpenChange(false);
            router.refresh();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to delete product. Please try again.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product{" "}
                        <span className="font-semibold">"{productName}"</span> from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Delete Product"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

