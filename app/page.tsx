"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const params = useParams<{ lang: string }>();
  const router = useRouter()
  useEffect(() => router.push("/de"))
  return null;
}
