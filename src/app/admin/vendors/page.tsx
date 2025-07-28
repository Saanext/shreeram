
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
import { mockUsers } from "@/lib/data"
import { Switch } from "@/components/ui/switch"
import { AddVendorDialog } from "@/components/admin/AddVendorDialog"
import Link from "next/link"

export default function AdminVendorsPage() {
    const vendors = mockUsers.filter(u => u.role === 'vendor');

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-headline font-bold">Vendors</h1>
                    <p className="text-muted-foreground">Manage all vendor accounts.</p>
                </div>
                <AddVendorDialog />
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
                        {vendors.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/admin/vendors/${user.id}`} className="hover:underline text-primary">
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="hidden md:table-cell">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Switch defaultChecked={user.status === 'active'} id={`status-${user.id}`} />
                                        <label htmlFor={`status-${user.id}`} className="capitalize text-sm">{user.status}</label>
                                    </div>
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
