
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { AddProductDialog } from "@/components/common/AddProductDialog"
import { ProductActionsMenu } from "@/components/vendor/ProductActionsMenu"
import Link from "next/link"

export default async function VendorProductsPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/vendor/login");
    }

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', user.id)
        .order('created_at', { ascending: false });

    // Handle case where product might not have image URL
    // And ensure Price is handled if it's stored as different type

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">My Products</h1>
                    <p className="text-muted-foreground">Manage your product listings.</p>
                </div>
                <AddProductDialog vendorId={user.id} />
            </div>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    Image
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="hidden md:table-cell">Price</TableHead>
                                <TableHead className="hidden md:table-cell">Stock</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="relative h-16 w-16">
                                            {product.image_urls && product.image_urls[0] ? (
                                                <Image
                                                    alt={product.name}
                                                    className="aspect-square rounded-md object-cover"
                                                    fill
                                                    src={product.image_urls[0].startsWith('http')
                                                        ? product.image_urls[0]
                                                        : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${product.image_urls[0]}`
                                                    }
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.category}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">₹{product.price?.toFixed(2)}</TableCell>
                                    <TableCell className="hidden md:table-cell">{product.stock || 0}</TableCell>
                                    <TableCell>
                                        <ProductActionsMenu
                                            productId={product.id}
                                            productSlug={product.slug}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!products?.length && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No products found. Add your first product!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
