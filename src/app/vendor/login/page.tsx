'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { handleLogin } from "./actions";

export default function VendorLoginPage() {
  return (
    <LoginCard
      title="Vendor Portal"
      description="Sign in to manage your products and orders."
      userType="Vendor"
      loginAction={handleLogin}
    />
  );
}
