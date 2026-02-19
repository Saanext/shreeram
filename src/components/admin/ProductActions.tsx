'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";
import Link from "next/link";

interface ProductActionsProps {
    product: {
        id: string;
        name: string;
        slug?: string;
    };
}

export function ProductActions({ product }: ProductActionsProps) {
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const productLink = product.slug ? `/products/${product.slug}` : `/products/${product.id}`;

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
                        <Link href={productLink}>View Product</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                        Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => setDeleteOpen(true)}
                    >
                        Delete Product
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <EditProductDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                productId={product.id}
            />

            <DeleteProductDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                productId={product.id}
                productName={product.name}
            />
        </>
    );
}

