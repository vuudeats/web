"use client"

import { useRouter } from "next/navigation";
import LoginForm from "@/components/form/login-form";
import { Button } from "@/components/ui/button";

export default function ParallelLoginClient() {
  const router = useRouter();

  const onPressBack = () => {
    router.back();
  }

  return (
    <div className="flex justify-center items-center bg-black/10 backdrop-blur-[2px] h-screen w-full absolute top-0">
      <LoginForm />
    </div>
  );
}