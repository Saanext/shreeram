
'use client';

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
import { mockOrders } from "@/lib/data"
import { MoreHorizontal, FileSpreadsheet } from "lucide-react"
import { exportToCsv } from "@/lib/export";

export default function AdminOrdersPage() {

    const handleExport = () => {
        const dataToExport = mockOrders.map(order => ({
            orderId: order.id,
            customerName: order.customerName,
            status: order.status,
            date: order.date,
            total: order.total,
            vendorId: order.vendorId,
            items: order.items.map(item => `${item.productName} (x${item.quantity})`).join('; ')
        }));
        exportToCsv('orders.csv', dataToExport);
    }

    return (
        <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Orders</h1>
                    <p className="text-muted-foreground">Oversee and manage all customer orders.</p>
                </div>
                <Button onClick={handleExport}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export to XLS
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                    <DropdownMenuItem>Mark as Pending</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Delivered</DropdownMenuItem>
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
