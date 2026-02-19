'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { handleLogin } from "./actions";
import { CustomerHeader } from "@/components/customer/CustomerHeader";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function VendorLoginPage() {
  useEffect(() => {
    // Clear any existing session when visiting login page to prevent conflicts
    const supabase = createClient();
    supabase.auth.signOut();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <CustomerHeader />
      <main className="flex flex-1 items-center justify-center p-4">
        <LoginCard
          title="Vendor Partner Portal"
          description="Sign in to manage your products and orders."
          userType="Vendor"
          loginAction={handleLogin}
        />
      </main>
    </div>
  );
}
