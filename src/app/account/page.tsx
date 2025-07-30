
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUsers } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { KeyRound, ShoppingBag, User } from 'lucide-react';

export default function AccountPage() {
  const customer = mockUsers.find(u => u.role === 'customer'); // Mock a logged-in user

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-12 md:py-16">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">My Account</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl mt-2">
            Welcome back, {customer?.name}! Manage your profile and view your orders.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4 max-w-lg">
                            <div className="space-y-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input id="full-name" defaultValue={customer?.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={customer?.email} />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="bg-muted/20">
                    <CardHeader>
                        <CardTitle>Account Overview</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <Link href="/orders" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                            <ShoppingBag className="w-6 h-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">My Orders</h3>
                                <p className="text-sm text-muted-foreground">Track your past and current orders.</p>
                            </div>
                        </Link>
                         <Separator />
                         <Link href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                            <User className="w-6 h-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">My Details</h3>
                                <p className="text-sm text-muted-foreground">Update your personal information.</p>
                            </div>
                        </Link>
                         <Separator />
                        <Link href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                            <KeyRound className="w-6 h-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Change Password</h3>
                                <p className="text-sm text-muted-foreground">Update your account password.</p>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
