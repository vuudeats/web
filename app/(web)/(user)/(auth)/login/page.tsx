import LoginForm from "@/components/form/login-form";
import { useSession } from "next-auth/react";

export default function LoginPage() {
    return <div className="flex justify-center h-screen w-full">
        <LoginForm />
    </div>
}