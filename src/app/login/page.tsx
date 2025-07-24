'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { handleCustomerLogin } from "./actions";


export default function CustomerLoginPage() {

  return (
    <LoginCard
      title="Sign In"
      description="Access your account to view orders and manage your profile."
      userType="Customer"
      loginAction={handleCustomerLogin}
    />
  );
}
