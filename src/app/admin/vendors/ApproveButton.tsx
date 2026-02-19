'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { approveVendor } from './actions';
import { Loader2 } from 'lucide-react';

export function ApproveButton({ applicationId }: { applicationId: string }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setLoading(true);
        try {
            const result = await approveVendor(applicationId);

            if (result.success) {
                toast({
                    title: "Success",
                    description: "Vendor application approved successfully.",
                    className: "bg-green-600 text-white border-none"
                });
                // Optional: Close dialog if we had access to the state, 
                // but revalidatePath in action should refresh the list and maybe close it/remove the item.
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error || "Failed to approve vendor."
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred."
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleApprove} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Approve Application
        </Button>
    );
}
