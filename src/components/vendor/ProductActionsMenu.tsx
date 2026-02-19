'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
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

interface ProductActionsMenuProps {
    productId: string;
    productSlug?: string;
}

export function ProductActionsMenu({ productId, productSlug }: ProductActionsMenuProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const supabase = createClient();

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            toast({
                title: "Product Deleted",
                description: "The product has been permanently removed.",
            });

            router.refresh();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to delete product.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/vendor/products/${productSlug || productId}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => setOpen(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            {loading ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
