
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountProfilePage() {
  const customer = mockUsers.find(u => u.role === 'customer'); // Mock a logged-in user

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Manage your public profile and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 max-w-lg">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={customer?.name} />
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
  );
}
