
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Home, Truck } from 'lucide-react';

export default function AddressesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Your Addresses</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Address
            </Button>
        </div>
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                    <div className="text-center text-muted-foreground">
                        <Home className="mx-auto h-12 w-12" />
                        <h3 className="mt-4 text-lg font-semibold">Address management coming soon!</h3>
                        <p className="mt-2 text-sm">You'll be able to add and manage your shipping addresses here.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
