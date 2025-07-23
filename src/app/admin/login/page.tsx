'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    'use server';
    // In a real app, you'd handle auth here.
    // We'll just redirect to the admin dashboard.
    // Note: next/navigation functions cannot be used in Server Actions.
    // A robust solution would involve forms and server actions properly.
    // For this UI-focused example, we simulate with client-side navigation.
    router.push('/admin/dashboard');
  }

  return (
    <LoginCard
      title="Admin Portal"
      description="Enter your credentials to access the dashboard."
      userType="Admin"
      loginAction={handleLogin}
    />
  );
}
