
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
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { createClient } from "@/lib/supabase/server"

export default async function AdminCustomersPage() {
    const supabase = await createClient();

    const { data: customers, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching customers:', error);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Customers</h1>
                    <p className="text-muted-foreground">Manage all customer accounts.</p>
                </div>
                 <Button>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export to XLS
                </Button>
            </div>
            <Card>
                <CardContent className="pt-6">
                    {customers && customers.length > 0 ? (
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
                                    <TableCell className="font-medium">{user.full_name || 'N/A'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="capitalize">Active</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-muted-foreground">No customers found.</p>
                            <p className="text-sm text-muted-foreground mt-2">Customers will appear here once they register.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
