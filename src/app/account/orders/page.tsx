
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockOrders } from '@/lib/data';
import Link from 'next/link';

export default function OrdersPage() {
  const customerOrders = mockOrders.filter(o => o.customerId === 'usr_004' || o.customerId === 'usr_005');

  return (
    <Card>
      <CardHeader>
          <CardTitle>Your Orders</CardTitle>
      </CardHeader>
      <CardContent>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {customerOrders.map(order => (
                      <TableRow key={order.id}>
                          <TableCell className="font-medium">
                              <Link href={`/orders/${order.id}`} className="hover:underline text-primary">#{order.id.slice(-6)}</Link>
                          </TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                              <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}>{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </CardContent>
    </Card>
  );
}
