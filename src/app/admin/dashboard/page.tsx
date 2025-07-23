import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, Users, Package, ShoppingCart, ArrowUpRight } from "lucide-react";
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
import { mockOrders, mockUsers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboardPage() {
  const totalRevenue = mockOrders.reduce((acc, order) => acc + order.total, 0);
  const totalUsers = mockUsers.length;
  const totalVendors = mockUsers.filter(u => u.role === 'vendor').length;
  const totalOrders = mockOrders.length;

  return (
    <>
       <h1 className="text-2xl font-headline font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} description="+20.1% from last month" />
        <StatCard title="Total Users" value={`+${totalUsers}`} icon={Users} description="All registered users" />
        <StatCard title="Total Vendors" value={`+${totalVendors}`} icon={Package} description="All registered vendors" />
        <StatCard title="Total Orders" value={`+${totalOrders}`} icon={ShoppingCart} description="+19% from last month" />
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
              {mockOrders.slice(0, 5).map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {mockUsers.find(u => u.id === order.customerId)?.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
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
