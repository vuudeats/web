"use client"

import { useRouter } from "next/navigation";
import LoginForm from "@/components/form/login-form";


export default function ParallelLoginClient() {
  const router = useRouter();

  const onPressBack = ()=>{
    router.back();
  }

  return (
    <div className="flex justify-center items-center bg-black/50 h-screen w-full absolute top-0">
      <LoginForm/>
    </div>
  );
}