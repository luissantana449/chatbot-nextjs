"use client";

import { usePathname } from "next/navigation";
import logoBranco from "@/public/images/Logo-branco.png";
import LogoutButton from "./LogoutButton";

import Image from "next/image";
import { useSession } from "next-auth/react";
export function Navbar() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <nav className="bg-primary flex items-center justify-between p-4 text-sm">
      <a
        className={`mr-4 ${
          pathname === "/" ? "text-white" : ""
        } grow flex justify-center `}
        href="/home"
      >
        <Image src={logoBranco} alt="logo-branco-header" className="w-44" />
      </a>
      <div className="text-white">
        {session.status === "authenticated" && <LogoutButton />}
      </div>
    </nav>
  );
}
