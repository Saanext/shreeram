
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
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { AddProductDialog } from "@/components/common/AddProductDialog"

export default function VendorProductsPage() {
    const vendorId = 'usr_002'; // Mocking logged in vendor
    const vendorProducts = mockProducts.filter(p => p.vendorId === vendorId);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">My Products</h1>
                    <p className="text-muted-foreground">Manage your product listings.</p>
                </div>
                 <AddProductDialog />
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
                        {vendorProducts.map(product => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt={product.name}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.imageUrl}
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
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
