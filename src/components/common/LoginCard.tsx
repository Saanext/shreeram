
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
import { Logo } from "./Logo";

interface LoginCardProps {
  title: string;
  description: string;
  userType: 'Customer' | 'Admin' | 'Vendor';
  loginAction: () => Promise<void>;
}

export function LoginCard({ title, description, userType, loginAction }: LoginCardProps) {

  const getDashboardPath = () => {
    switch (userType) {
      case 'Admin': return '/admin/dashboard';
      case 'Vendor': return '/vendor/dashboard';
      default: return '/';
    }
  }

  return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-4">
          <Logo className="justify-center" />
          <div className="space-y-1">
            <CardTitle className="font-headline text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form action={loginAction}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                   {userType !== 'Customer' && (
                     <Link href="#" className="text-sm font-medium text-primary hover:underline">
                        Forgot Password?
                     </Link>
                   )}
                </div>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          {userType === 'Customer' && (
            <>
                <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline hover:text-primary font-medium">
                    Register
                </Link>
                </p>
                <div className="w-full">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/account">Demo Dashboard</Link>
                    </Button>
                </div>
            </>
          )}
           <p className="text-xs text-muted-foreground">
            {userType !== 'Customer' ? 'Go back to ' : ''}
            <Link href="/" className="underline hover:text-primary">
              main site
            </Link>
          </p>
        </CardFooter>
      </Card>
  );
}
