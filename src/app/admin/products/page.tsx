

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockProducts } from "@/lib/data"
import Image from "next/image"
import { MoreHorizontal, CheckCircle2, Star, Tag } from "lucide-react"
import { AddProductDialog } from "@/components/common/AddProductDialog"

export default function AdminProductsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Products</h1>
                    <p className="text-muted-foreground">Manage all products across the platform.</p>
                </div>
                 <AddProductDialog />
            </div>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                            <TableHead className="hidden md:table-cell">Stock</TableHead>
                            <TableHead className="hidden md:table-cell">Featured</TableHead>
                            <TableHead>
                            <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockProducts.map(product => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt={product.name}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.imageUrls[0]}
                                    width="64"
                                    data-ai-hint={`${product.category} clothing`}
                                />
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>
                                <Badge variant="outline">{product.category}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">₹{product.price.toFixed(2)}</TableCell>
                                <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="flex flex-col gap-1">
                                    {product.isBestSeller && (
                                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                                        <Star className="h-3 w-3" />
                                        Best Seller
                                      </Badge>
                                    )}
                                    {product.isOnSale && (
                                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                                        <Tag className="h-3 w-3" />
                                        On Sale
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View Product</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Unlist Product</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                         ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
