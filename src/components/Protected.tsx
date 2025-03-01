"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/"]; // Routes that authenticated users shouldn't access

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Prevent redirecting while loading
    const currentRoute = pathname.split("?")[0]; // Ignore query parameters

    // Redirect unauthenticated users away from protected routes like `/dashboard`
    if (!user && currentRoute.startsWith("/dashboard")) {
      router.replace("/");
    }


    if (user && publicRoutes.includes(currentRoute)) {
      router.replace("/dashboard");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-20 w-20 animate-spin text-[#5d3fd3]" />
      </div>
    );
  }

  return <>{children}</>;
}
