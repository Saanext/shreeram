
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTheme } from './actions';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
    const { toast } = useToast();
    const [primaryColor, setPrimaryColor] = React.useState('#3F51B5');
    const [accentColor, setAccentColor] = React.useState('#9575CD');
    const [isSaving, setIsSaving] = React.useState(false);

    const handleThemeApply = async () => {
        setIsSaving(true);
        try {
            const result = await updateTheme(primaryColor, accentColor);
            if (result.success) {
                toast({
                    title: 'Theme Updated',
                    description: 'Your new color palette has been applied. Refresh to see changes.',
                });
                // Note: a full page reload is needed to see CSS variable changes
                setTimeout(() => window.location.reload(), 2000);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: result.message,
                });
            }
        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred.',
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
             <div>
                <h1 className="text-2xl font-headline font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage platform settings and appearance.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Site Information</CardTitle>
                    <CardDescription>Update your site's name and contact details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="site-name">Site Name</Label>
                            <Input id="site-name" defaultValue="RoleCraft" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" defaultValue="support@rolecraft.com" />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Theme Control</CardTitle>
                    <CardDescription>Customize the main colors of the website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="primary-color">Primary Color</Label>
                            <Input 
                                id="primary-color" 
                                type="color" 
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="h-12" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="accent-color">Accent Color</Label>
                            <Input 
                                id="accent-color" 
                                type="color" 
                                value={accentColor} 
                                onChange={(e) => setAccentColor(e.target.value)}
                                className="h-12" />
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="border-t px-6 py-4">
                    <Button onClick={handleThemeApply} disabled={isSaving}>
                        {isSaving ? 'Applying...' : 'Apply Theme'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
