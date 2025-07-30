
'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { handleCustomerLogin } from "./actions";
import { CustomerHeader } from "@/components/customer/CustomerHeader";


export default function CustomerLoginPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <main className="flex-1 flex items-center justify-center bg-muted/40 p-4">
        <LoginCard
          title="Sign In"
          description="Access your account to view orders and manage your profile."
          userType="Customer"
          loginAction={handleCustomerLogin}
        />
      </main>
    </div>
  );
}
