import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, Users, Package, ShoppingCart } from "lucide-react";
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

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch Data in Parallel
  const [
    { count: customersCount },
    { count: vendorsCount },
    { count: ordersCount, data: orders },
    { data: recentOrdersData }
  ] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase.from('vendors').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total', { count: 'exact' }),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5)
  ]);

  // Fetch customer details separately for recent orders
  let recentOrders = recentOrdersData || [];
  if (recentOrdersData && recentOrdersData.length > 0) {
    const customerIds = [...new Set(recentOrdersData.map(o => o.customer_id).filter(Boolean))];

    if (customerIds.length > 0) {
      const { data: customers } = await supabase
        .from('customers')
        .select('id, full_name, email')
        .in('id', customerIds);

      const customerMap = new Map(customers?.map(c => [c.id, c]) || []);

      recentOrders = recentOrdersData.map(order => ({
        ...order,
        customer: customerMap.get(order.customer_id)
      }));
    }
  }

  const totalRevenue = orders?.reduce((acc, order) => acc + (order.total || 0), 0) || 0;
  const totalUsers = (customersCount || 0) + (vendorsCount || 0); // + Admins if needed, but usually users=customers

  return (
    <>
      <h1 className="text-2xl font-headline font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} description="Lifetime revenue" />
        <StatCard title="Total Customers" value={`+${customersCount || 0}`} icon={Users} description="Registered customers" />
        <StatCard title="Total Vendors" value={`+${vendorsCount || 0}`} icon={Package} description="Active vendors" />
        <StatCard title="Total Orders" value={`+${ordersCount || 0}`} icon={ShoppingCart} description="All time orders" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>An overview of the most recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders?.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.customer?.full_name || 'Guest'}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.customer?.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{order.total?.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">No recent orders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
