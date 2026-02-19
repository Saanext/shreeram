import { createClient } from '@/lib/supabase/server';
import { approveVendor } from './actions';
import { ApproveButton } from './ApproveButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default async function AdminVendorsPage() {
    const supabase = await createClient();

    // 1. Verify Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/admin/login');

    const { data: role } = await supabase.rpc('get_user_role');
    if (role !== 'admin') redirect('/admin/login?error=Unauthorized');

    // 2. Fetch Applications
    const { data: applications } = await supabase
        .from('vendor_applications')
        .select('*')
        .order('created_at', { ascending: false });

    // 3. Fetch Active Vendors
    const { data: vendors } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Vendor Management</h1>

            {/* PENDING APPLICATIONS */}
            <Card>
                <CardHeader>
                    <CardTitle>Vendor Applications ({applications?.filter(a => a.status === 'pending').length || 0})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Store Name</TableHead>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications?.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.store_name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{app.full_name}</span>
                                            <span className="text-xs text-muted-foreground">{app.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={app.status === 'approved' ? 'default' : 'secondary'}>
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* VIEW DETAILS DIALOG */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">View Details</Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>Application Details: {app.store_name}</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid grid-cols-2 gap-4 py-4">
                                                    <div className="space-y-1">
                                                        <Label className="text-muted-foreground">Applicant Name</Label>
                                                        <p className="font-medium">{app.full_name}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-muted-foreground">Email</Label>
                                                        <p className="font-medium">{app.email}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-muted-foreground">Phone</Label>
                                                        <p className="font-medium">{app.phone}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-muted-foreground">GST Number</Label>
                                                        <p className="font-medium">{app.gst_number}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-muted-foreground">Location</Label>
                                                        <p className="font-medium">{app.business_location}</p>
                                                    </div>
                                                    <div className="col-span-2 space-y-1">
                                                        <Label className="text-muted-foreground">Business Documents</Label>
                                                        {app.documents_url ? (
                                                            <div className="mt-2">
                                                                <a
                                                                    href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vendor-documents/${app.documents_url}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-primary underline hover:text-primary/80"
                                                                >
                                                                    View Document (Opens in new tab)
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-yellow-600">No document uploaded</p>
                                                        )}
                                                    </div>
                                                </div>
                                                {app.status === 'pending' && (
                                                    <div className="flex justify-end gap-2 mt-4">
                                                        <ApproveButton applicationId={app.id} />
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!applications?.length && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground">No applications found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* ACTIVE VENDORS */}
            <Card>
                <CardHeader>
                    <CardTitle>Active Vendors ({vendors?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Store</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Verified</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendors?.map((v) => (
                                <TableRow key={v.id}>
                                    <TableCell className="font-medium">{v.store_name}</TableCell>
                                    <TableCell>{v.full_name}</TableCell>
                                    <TableCell>{v.phone || '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-green-600 border-green-600">Verified</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
