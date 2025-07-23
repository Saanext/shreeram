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
import { mockOrders, mockProducts, mockUsers } from "@/lib/data";

export default function VendorDashboardPage() {
    const vendorId = 'usr_002'; // Mocking logged in vendor
    const vendorOrders = mockOrders.filter(o => o.vendorId === vendorId);
    const vendorProducts = mockProducts.filter(p => p.vendorId === vendorId);
    const totalRevenue = vendorOrders.reduce((acc, order) => acc + order.total, 0);

  return (
    <>
       <h1 className="text-2xl font-headline font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} description="+15.2% from last month" />
        <StatCard title="Active Products" value={`${vendorProducts.length}`} icon={Package} description="Total products you are selling" />
        <StatCard title="Total Orders" value={`+${vendorOrders.length}`} icon={ShoppingCart} description="+10% from last month" />
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
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                 <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorOrders.slice(0, 5).map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                   <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
