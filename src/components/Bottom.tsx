"use client";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  Gem,
  LifeBuoy,
  LogOut,
  User,
} from "lucide-react";

import { useAuthContext } from "@/app/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";

type User = {
  email: string;
  name: string;
  image: string;
};

export default function DropdownMenuDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthContext();

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <span className="flex justify-between items-center">
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
          {isOpen ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 right-20">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Gem />
            <span>Subscribe </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="bg-red-100 text-red-500">
          <LogOut />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
