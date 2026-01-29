
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
import { Badge } from "@/components/ui/badge"
import { mockUsers } from "@/lib/data"
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { exportToCsv } from "@/lib/export";

export default function AdminCustomersPage() {
    const customers = mockUsers.filter(u => u.role === 'customer');

    const handleExport = () => {
        const dataToExport = customers.map(customer => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            role: customer.role,
            status: customer.status,
            createdAt: customer.createdAt
        }));
        exportToCsv('customers.csv', dataToExport);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Customers</h1>
                    <p className="text-muted-foreground">Manage all customer accounts.</p>
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
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="hidden md:table-cell">Created At</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {customers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'active' ? 'secondary' : 'outline'} className="capitalize">{user.status}</Badge>
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
