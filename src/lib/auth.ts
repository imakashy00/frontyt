import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  image: string;
  subscribed: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Use useMemo to prevent recreating the apiClient on every render
  const apiClient = useMemo(
    () =>
      axios.create({
        baseURL: API_URL,
        withCredentials: true,
      }),
    []
  );

  // refresh the token - keep this function focused only on token refresh
  const handleTokenRefresh = useCallback(async () => {
    try {
      await apiClient.get("/refresh");
      return true;
    } catch {
      // Just return false to indicate failure
      // Don't manipulate user state or navigation directly here
      return false;
    }
  }, [apiClient]); // Remove router dependency

  // Handle authentication failures in the fetchUser function instead
  const fetchUser = useCallback(async () => {
    try {
      const res = await apiClient.get("/me");
      setUser(res.data);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const refreshSuccess = await handleTokenRefresh();
        if (refreshSuccess) {
          try {
            const res = await apiClient.get("/me");
            setUser(res.data);
            return true;
          } catch {
            setUser(null);
            return false;
          }
        } else {
          // Handle failed refresh here
          setUser(null);
          router.replace("/");
          return false;
        }
      }
      setUser(null);
      return false;
    }
  }, [handleTokenRefresh, apiClient, router]);

  // Logout functionality
  const logout = useCallback(async () => {
    try {
      await apiClient.post("/logout");
      setUser(null);
      router.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const refreshSuccess = await handleTokenRefresh();
        if (refreshSuccess) {
          try {
            await apiClient.post("/logout");
          } finally {
            setUser(null);
            router.replace("/");
          }
        }
      }
    }
  }, [router, handleTokenRefresh, apiClient]);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        if (isMounted) {
          await fetchUser();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [fetchUser]);

  return { user, loading, logout };
}
