import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, Package, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server";

export default async function VendorDashboardPage() {
    const supabase = await createClient();

    // Get current vendor user
    const { data: { user } } = await supabase.auth.getUser();
    const vendorId = user?.id;

    // Fetch vendor's products
    const { data: vendorProducts } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', vendorId);

    // Fetch vendor's orders through order_items
    const { data: orderItems } = await supabase
        .from('order_items')
        .select('*, order:orders(*)')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false })
        .limit(5);

    // Calculate total revenue from order items
    const totalRevenue = orderItems?.reduce((acc, item) => acc + (item.total || 0), 0) || 0;
    const totalOrders = orderItems?.length || 0;

  return (
    <>
       <h1 className="text-2xl font-headline font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} description="From all your sales" />
        <StatCard title="Active Products" value={`${vendorProducts?.length || 0}`} icon={Package} description="Total products you are selling" />
        <StatCard title="Total Orders" value={`+${totalOrders}`} icon={ShoppingCart} description="All time orders" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Orders</CardTitle>
          <CardDescription>An overview of your most recent sales.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                 <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems && orderItems.length > 0 ? orderItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={item.order?.status === 'delivered' ? 'default' : 'secondary'} className="capitalize">
                      {item.order?.status || 'pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{item.total?.toFixed(2) || '0.00'}</TableCell>
                   <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No orders yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
