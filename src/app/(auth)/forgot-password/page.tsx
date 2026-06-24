import type { Metadata } from "next";
import { ForgotFlow } from "@/components/auth/forgot-flow";

export const metadata: Metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return <ForgotFlow />;
}
