"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/", "/terms", "/privacy-policy"];

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const currentRoute = pathname.split("?")[0]; // Ignore query parameters
  const isPublicRoute = publicRoutes.includes(currentRoute);

  useEffect(() => {
    if (loading) return;

    // Redirect unauthenticated users away from protected routes like `/dashboard`
    if (!user && currentRoute.startsWith("/dashboard")) {
      router.replace("/");
    }

    // Redirect authenticated users from public routes to `/dashboard`
    if (user && isPublicRoute) {
      router.replace("/dashboard");
    }
  }, [user, loading, currentRoute, router, isPublicRoute]);

  // Only show loader on protected routes; immediately render public routes even if still loading
  if (loading && !isPublicRoute) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-20 w-20 animate-spin text-[#5d3fd3]" />
      </div>
    );
  }

  return <>{children}</>;
}
