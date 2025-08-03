
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
    { name: 'Modern Minimalist', primary: '#FFFFFF', secondary: '#333333', accent: '#007BFF' },
    { name: 'Earthy & Natural', primary: '#F7F7F7', secondary: '#9DC183', accent: '#6B4F3F' },
    { name: 'Luxury Noir', primary: '#000000', secondary: '#FFD700', accent: '#1C1C1C' },
    { name: 'Bright & Playful', primary: '#FFEB3B', secondary: '#00BCD4', accent: '#FF5722' },
    { name: 'Mocha Mousse', primary: '#A0755B', secondary: '#F7E8D3', accent: '#B17A50' },
    { name: 'Ocean Breeze', primary: '#008080', secondary: '#FAEBD7', accent: '#87CEEB' },
    { name: 'Vibrant Heat', primary: '#BF1922', secondary: '#FFC93C', accent: '#FACF39' },
    { name: 'Trust & Growth', primary: '#137DC5', secondary: '#68D388', accent: '#F4F4F4' },
    { name: 'Pastel Dream', primary: '#FFF5E1', secondary: '#D8B4FE', accent: '#A7F3D0' },
    { name: 'Cyber Future', primary: '#1A1A1D', secondary: '#4A90E2', accent: '#00F5D4' },
];


export default function AdminSettingsPage() {
    const { toast } = useToast();
    const [selectedPalette, setSelectedPalette] = React.useState(colorPalettes[0]);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleThemeApply = async () => {
        setIsSaving(true);
        try {
            const result = await updateTheme(selectedPalette.secondary, selectedPalette.accent, selectedPalette.primary);
            if (result.success) {
                toast({
                    title: 'Theme Updated',
                    description: 'Your new color palette has been applied. Refresh to see changes.',
                });
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
    
    const handlePaletteSelect = (palette: { name: string, primary: string, secondary: string, accent: string }) => {
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
                            <Input id="site-name" defaultValue="SRE Clothing" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" defaultValue="support@sreclothing.com" />
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
                        <p className="text-sm text-muted-foreground mb-4">Select from a predefined set of palettes.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                    <div className="flex h-16 w-full items-center justify-center gap-1 rounded-md overflow-hidden relative" style={{backgroundColor: palette.primary}}>
                                        <div className="h-full w-2/3 rounded-sm" style={{ backgroundColor: palette.secondary }} />
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
