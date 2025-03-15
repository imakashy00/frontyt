"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DropdownMenuDemo() {
  const { user } = useAuthContext();
  const router = useRouter();

  return (
    <Link href={'/dashboard/profile'}>
    <span
      className="flex justify-around items-center"
      onClick={() => router.push("dashboard/profile")}
    >
      {user?.image && (
        <Image
          src={user?.image}
          width={24}
          height={24}
          alt="Profile"
          className="rounded-full"
          priority
        />
      )}
      <span>{user?.name}</span>
      <ArrowRight size={20} />
    </span>
    </Link>
  );
}
