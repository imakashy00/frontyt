"use client";
import Protected from "@/components/Protected";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { ContentProvider } from "../context/YoutubeContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Return nothing while loading or if not authenticated
  }
  return (
    <Protected>
      <ContentProvider>
        <div className="w-full min-h-screen bg-background flex">
          <aside className="min-w-[220px] rounded-xl border-r border-[#5d3fd3]">
            <Sidebar />
          </aside>
          {children}
        </div>
      </ContentProvider>
    </Protected>
  );
};

export default DashboardLayout;
