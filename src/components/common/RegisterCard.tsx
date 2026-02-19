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

interface RegisterCardProps {
    title: string;
    description: string;
    userType: 'Customer' | 'Admin' | 'Vendor';
    registerAction: (formData: FormData) => Promise<void>;
}

export function RegisterCard({ title, description, userType, registerAction }: RegisterCardProps) {
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
                <form action={registerAction}>
                    <div className="grid w-full items-center gap-4">
                        {userType === 'Vendor' ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" name="name" type="text" placeholder="John Doe" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="storeName">Store Name</Label>
                                        <Input id="storeName" name="storeName" type="text" placeholder="My Awesome Store" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="gst">GST Number</Label>
                                        <Input id="gst" name="gst" type="text" placeholder="22AAAAA0000A1Z5" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="location">Business Location</Label>
                                        <Input id="location" name="location" type="text" placeholder="City, State" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" placeholder="••••••••" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="documents">Business Documents (GST/ID Proof)</Label>
                                    <Input id="documents" name="documents" type="file" required />
                                </div>
                            </>
                        ) : (
                            // Customer Fields
                            <>
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
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
                                </div>
                            </>
                        )}
                        <Button type="submit" className="w-full">Register</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
                {userType === 'Customer' && (
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="underline hover:text-primary font-medium">
                            Sign in
                        </Link>
                    </p>
                )}
                {userType === 'Vendor' && (
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/vendor/login" className="underline hover:text-primary font-medium">
                            Sign in
                        </Link>
                    </p>
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
