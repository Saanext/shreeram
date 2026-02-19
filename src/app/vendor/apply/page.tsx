'use client';

import { useState } from 'react';
import { submitVendorApplication } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function VendorApplicationPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const result = await submitVendorApplication(formData);

        setIsSubmitting(false);

        if (result.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            });
        } else {
            setIsSuccess(true);
            toast({
                title: 'Application Submitted!',
                description: 'We will review your details and contact you shortly.',
            });
        }
    }

    if (isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl text-green-600">Application Received!</CardTitle>
                        <CardDescription>
                            Thank you for applying. Our team will review your application and send login details to your email if approved.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/">Return to Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Become a Vendor</CardTitle>
                    <CardDescription>
                        Join our marketplace. Fill out the form below to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name *</Label>
                            <Input id="full_name" name="full_name" required placeholder="John Doe" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="store_name">Store Name *</Label>
                            <Input id="store_name" name="store_name" required placeholder="My Awesome Store" />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" placeholder="+91 9876543210" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gst_number">GST Number</Label>
                                <Input id="gst_number" name="gst_number" placeholder="Optional" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Store Address</Label>
                            <Textarea id="address" name="address" placeholder="Where are you located?" />
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Already have an account? <Link href="/vendor/login" className="text-blue-600 hover:underline">Login here</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
