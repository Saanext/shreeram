
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/common/Logo";
import { CustomerHeader } from '@/components/customer/CustomerHeader';

import { signup } from './actions';

// ... imports ...

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <main className="flex-1 flex items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center space-y-4">
            <Logo className="justify-center" />
            <div className="space-y-1">
              <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
              <CardDescription>Join our platform to start shopping.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form action={signup}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full">Register</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline hover:text-primary font-medium">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
