'use client';

import { handleVendorRegister as vendorRegisterAction } from "./actions";
import { RegisterCard } from "../../../components/common/RegisterCard";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { useToast } from "@/hooks/use-toast";

export default function VendorRegisterPage() {
    const { toast } = useToast();

    async function handleVendorRegister(formData: FormData) {
        const result = await vendorRegisterAction(formData);
        if (result?.error) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: result.error,
            });
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <CustomerHeader />
            <main className="flex flex-1 items-center justify-center p-4">
                <RegisterCard
                    title="Vendor Registration"
                    description="Create a new vendor account to start selling."
                    userType="Vendor"
                    registerAction={handleVendorRegister}
                />
            </main>
        </div>
    );
}
