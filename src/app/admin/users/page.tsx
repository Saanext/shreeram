
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockUsers } from "@/lib/data"
import { Switch } from "@/components/ui/switch"
import { AddVendorDialog } from "@/components/admin/AddVendorDialog"

export default function AdminUsersPage() {
    const vendors = mockUsers.filter(u => u.role === 'vendor');
    const customers = mockUsers.filter(u => u.role === 'customer');

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-headline font-bold">Users</h1>
                <p className="text-muted-foreground">Manage all vendor and customer accounts.</p>
            </div>
            <Tabs defaultValue="vendors">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="vendors">Vendors</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                    </TabsList>
                     <AddVendorDialog />
                </div>
                <TabsContent value="vendors">
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
                                        <TableCell className="font-medium">{user.name}</TableCell>
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
                </TabsContent>
                <TabsContent value="customers">
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
                </TabsContent>
            </Tabs>
        </div>
    )
}
