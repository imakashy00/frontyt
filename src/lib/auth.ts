import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, {
        withCredentials: true
      });
      setUser(null);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
            withCredentials: true
          });
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, {
            withCredentials: true
          });
          setUser(null);
          router.push('/');
        } catch {
          router.push('/');
        }
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          withCredentials: true
        });
        setUser(res.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
              withCredentials: true
            });
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
              withCredentials: true
            });
            setUser(res.data);
          } catch  {
            setUser(null);
            router.replace('/');
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
  }, [router]);

  return { user, loading ,logout};
}