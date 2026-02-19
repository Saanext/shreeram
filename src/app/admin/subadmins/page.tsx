

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
import { AddSubAdminDialog } from "@/components/admin/AddSubAdminDialog"
import { createClient } from "@/lib/supabase/server"

export default async function AdminSubAdminsPage() {
    const supabase = await createClient();

    // Get current user to exclude them from the list
    const { data: { user } } = await supabase.auth.getUser();

    const { data: subAdmins, error } = await supabase
        .from('admins')
        .select('*')
        .neq('id', user?.id || '') // Exclude current admin
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching sub-admins:', error);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Sub-Admins</h1>
                    <p className="text-muted-foreground">Manage administrator accounts and their roles.</p>
                </div>
                <AddSubAdminDialog />
            </div>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Email</TableHead>
                                <TableHead className="hidden md:table-cell">Permissions</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subAdmins && subAdmins.length > 0 ? subAdmins.map(admin => (
                                <TableRow key={admin.id}>
                                    <TableCell className="font-medium">{admin.full_name || 'N/A'}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{admin.email}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex gap-1 flex-wrap">
                                            {admin.permissions && typeof admin.permissions === 'object' ? (
                                                Object.entries(admin.permissions).map(([key, value]) => {
                                                    if (key === 'all' && value) return <Badge key={key} variant="outline">All Permissions</Badge>;
                                                    if (value) return <Badge key={key} variant="outline" className="capitalize">{key}</Badge>;
                                                    return null;
                                                })
                                            ) : (
                                                <span className="text-muted-foreground text-sm">No permissions</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="capitalize">Active</Badge>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <p className="text-muted-foreground">No sub-admins found.</p>
                                        <p className="text-sm text-muted-foreground mt-2">Add sub-admins to help manage the platform.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
