"use client";
import React from "react";
import { useRouter } from "next/navigation";
type Props = {};
import memomindlogo from "../../../assets/memomind_logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
const Nav = (props: Props) => {
  const router = useRouter();
  return (
    <nav className="px-5 hero py-3 w-screen sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 md:text-3xl text">
            <Image
              src={memomindlogo}
              alt="Logo"
              className="w-10 h-10 cursor-pointer"
            />
            <p>MemoMind</p>
          </div>
        </Link>
        <div>
          <Button
            className="rounded-lg w-28 h-10 bg-yellow-500 hover:bg-yellow-600"
            onClick={() => router.push("/sign-in")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
