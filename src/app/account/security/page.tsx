
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SecurityPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login & Security</CardTitle>
        <CardDescription>Update your password for better security.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 max-w-lg">
            <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
            </div>
        </form>
      </CardContent>
       <CardFooter className="border-t px-6 py-4">
            <Button>Update Password</Button>
      </CardFooter>
    </Card>
  );
}
