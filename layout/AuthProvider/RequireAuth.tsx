import Loading from "@/components/utils/Loading";
import authStore from "@/store/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RequireAuth({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { loading, auth, check } = authStore();
  const router = useRouter();
  const path = usePathname();
  const fetchConnected = async () => {
    try {
      await check();
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!auth) {
      fetchConnected();
    }
  }, [auth]);

  if (loading) return <Loading />;
  if (path === "/login" || auth) return children;
  return;
}
