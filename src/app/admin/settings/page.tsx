
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
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const colorPalettes = [
    { name: 'Rose Quartz', primary: '#B76E79', accent: '#808080', background: '#FFFFFF' },
    { name: 'Gold Standard', primary: '#D4AF37', accent: '#36454F', background: '#FFFFFF' },
    { name: 'Serene Blue', primary: '#4682B4', accent: '#C0C0C0', background: '#FFFFFF' },
    { name: 'Classic Navy', primary: '#000080', accent: '#E0E0E0', background: '#FFFFFF' },
];

export default function AdminSettingsPage() {
    const { toast } = useToast();
    const [selectedPalette, setSelectedPalette] = React.useState(colorPalettes[0]);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleThemeApply = async () => {
        setIsSaving(true);
        try {
            const result = await updateTheme(selectedPalette.primary, selectedPalette.accent, selectedPalette.background);
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
    
    const handlePaletteSelect = (palette: { name: string, primary: string, accent: string, background: string }) => {
        setSelectedPalette(palette);
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
                            <Input id="site-name" defaultValue="Shree Ram Enterprise" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" defaultValue="support@shreeramenterprise.com" />
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
                <CardContent className="space-y-8">
                    <div>
                        <Label className="font-medium">Color Palettes</Label>
                        <p className="text-sm text-muted-foreground mb-4">Select from a predefined set of luxury palettes.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {colorPalettes.map((palette) => (
                                <button
                                    key={palette.name}
                                    onClick={() => handlePaletteSelect(palette)}
                                    className={cn(
                                        "rounded-lg border-2 p-1 transition-all",
                                        selectedPalette.name === palette.name
                                            ? 'border-primary'
                                            : 'border-transparent hover:border-muted-foreground/50'
                                    )}
                                >
                                    <div className="flex h-16 w-full items-center justify-center gap-1 rounded-md overflow-hidden relative" style={{backgroundColor: palette.background}}>
                                        <div className="h-full w-2/3 rounded-sm" style={{ backgroundColor: palette.primary }} />
                                        <div className="h-full w-1/3 rounded-sm" style={{ backgroundColor: palette.accent }} />
                                         {selectedPalette.name === palette.name && (
                                            <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                                                <Check className="h-8 w-8 text-primary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-center text-sm font-medium mt-2">{palette.name}</p>
                                </button>
                            ))}
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
