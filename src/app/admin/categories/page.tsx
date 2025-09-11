
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
import { Button } from "@/components/ui/button"
import { mockCategories } from "@/lib/data"
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { AddCategoryDialog } from "@/components/admin/AddCategoryDialog"

export default function AdminCategoriesPage() {
    const parentCategories = mockCategories.filter(c => !c.parentId);

    const getSubcategoryCount = (categoryId: string) => {
        return mockCategories.filter(c => c.parentId === categoryId).length;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Categories</h1>
                    <p className="text-muted-foreground">Manage your product categories and subcategories.</p>
                </div>
                 <AddCategoryDialog />
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
                            <TableHead>Subcategories</TableHead>
                            <TableHead className="hidden md:table-cell">Products</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {parentCategories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt={category.name}
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={category.imageUrl}
                                    width="64"
                                    data-ai-hint={`${category.name} category`}
                                />
                                </TableCell>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>
                                    {getSubcategoryCount(category.id)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{category.productCount}</TableCell>
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
                                    <DropdownMenuItem>Edit Category</DropdownMenuItem>
                                    <DropdownMenuItem>View Subcategories</DropdownMenuItem>
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
