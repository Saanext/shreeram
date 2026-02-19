
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
import { MoreHorizontal, FileSpreadsheet } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function AdminOrdersPage() {
    const supabase = await createClient();

    // First, try to fetch orders without JOIN to see if table exists
    const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
    }

    // If we have orders, fetch customer details separately
    let ordersWithCustomers = orders || [];
    if (orders && orders.length > 0) {
        const customerIds = [...new Set(orders.map(o => o.customer_id).filter(Boolean))];

        if (customerIds.length > 0) {
            const { data: customers } = await supabase
                .from('customers')
                .select('id, full_name, email')
                .in('id', customerIds);

            const customerMap = new Map(customers?.map(c => [c.id, c]) || []);

            ordersWithCustomers = orders.map(order => ({
                ...order,
                customer: customerMap.get(order.customer_id)
            }));
        }
    }

    return (
        <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Orders</h1>
                    <p className="text-muted-foreground">Oversee and manage all customer orders.</p>
                </div>
                <Button>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export to XLS
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    {ordersWithCustomers && ordersWithCustomers.length > 0 ? (
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
                            {ordersWithCustomers.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                                    <TableCell>{order.customer?.full_name || 'Guest'}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="capitalize">
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">₹{order.total?.toFixed(2) || '0.00'}</TableCell>
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
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-muted-foreground">No orders found.</p>
                            <p className="text-sm text-muted-foreground mt-2">Orders will appear here once customers make purchases.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
