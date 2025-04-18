"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetAuthStatus } from "./useGetAuthStatus";

import { Loader2 } from "lucide-react";

export default function Page() {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useGetAuthStatus();

  useEffect(() => {
    if (data?.success) {
      if (configId) {
        localStorage.removeItem("configurationId");
        router.push(`/configure/preview?id=${configId}`);
      } else {
        router.push("/");
      }
    }
  }, [data?.success, configId, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
