'use client';
import { LoginCard } from "@/components/common/LoginCard";
import { handleLogin } from "./actions";

export default function AdminLoginPage() {
  return (
    <LoginCard
      title="Admin Portal"
      description="Enter your credentials to access the dashboard."
      userType="Admin"
      loginAction={handleLogin}
    />
  );
}
