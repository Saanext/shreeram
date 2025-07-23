'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { useRouter } from "next/navigation";

export default function VendorLoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    'use server';
    router.push('/vendor/dashboard');
  }

  return (
    <LoginCard
      title="Vendor Portal"
      description="Sign in to manage your products and orders."
      userType="Vendor"
      loginAction={handleLogin}
    />
  );
}
