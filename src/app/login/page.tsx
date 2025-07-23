'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { useRouter } from "next/navigation";

export default function CustomerLoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    'use server';
    // In a real app, you'd handle auth here.
    // We'll just redirect to the main page.
    router.push('/');
  }

  return (
    <LoginCard
      title="Customer Login"
      description="Access your account to view orders and manage your profile."
      userType="Customer"
      loginAction={handleLogin}
    />
  );
}
