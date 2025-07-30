
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Home } from 'lucide-react';

export default function AddressesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Addresses</CardTitle>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
          <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg bg-muted/50">
              <div className="text-center text-muted-foreground">
                  <Home className="mx-auto h-12 w-12" />
                  <h3 className="mt-4 text-lg font-semibold">No addresses saved</h3>
                  <p className="mt-2 text-sm">Add a new address to get started.</p>
              </div>
          </div>
      </CardContent>
    </Card>
  );
}
