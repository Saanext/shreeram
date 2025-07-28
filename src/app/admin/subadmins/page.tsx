

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
import { AddSubAdminDialog } from "@/components/admin/AddSubAdminDialog"

export default function AdminSubAdminsPage() {
    const subAdmins = mockUsers.filter(u => u.role === 'admin' && u.id !== 'usr_001'); // Exclude super admin

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
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {subAdmins.length > 0 ? subAdmins.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        {/* This is mock data, in a real app this would come from the user object */}
                                        <Badge variant="outline">Products</Badge>
                                        <Badge variant="outline">Vendors</Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'active' ? 'secondary' : 'outline'} className="capitalize">{user.status}</Badge>
                                </TableCell>
                            </TableRow>
                        )) : (
                           <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No sub-admins found.
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
