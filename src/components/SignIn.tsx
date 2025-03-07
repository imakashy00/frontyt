"use client"; // Ensure component runs only on the client side
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import google from "../../public/google.png";
import { Button } from "./ui/button";

interface SignInProps {
  width?: string;
  text?: string;
  image?: boolean;
}
export default function SignIn({
  width = "36",
  text = "Sign In",
  image = false
}: SignInProps) {
  const [isLoading] = useState(false);
  const login = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google`;
  };
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <Button
      onClick={login}
      className={`{w-${width} bg-[#5d3fd3] text-white hover:shadow-md py-5 flex items-center hover:bg-[#5d3fd3e3]  gap-3 transition-all duration-200 ease-in-out}`}
    >
      {image ? (
        <Image src={google} width={20} height={20} alt="Google Logo" priority />
      ) : null}
      <span className="font-medium">{text} </span>
    </Button>
  );
}
