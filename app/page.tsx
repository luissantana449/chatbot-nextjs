"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageTs() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
}
