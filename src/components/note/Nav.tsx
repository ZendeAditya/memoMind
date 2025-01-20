import Profile from "@/components/auth/Profile";
import Sidebar from "./Sidebar";
import Search from "./Inputs/Search";
import Link from "next/link";
import Image from "next/image";
import memomindlogo from "../../../assets/memomind_logo.png";
import React from "react";
const Nav = () => {
  return (
    <nav className="px-2 flex items-center justify-between py-2 w-screen border-b-2">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow text-center md:text-left">
          <Link href="/">
            <Image
              src={memomindlogo}
              alt="Logo"
              className="w-auto h-10 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <div className="">
        <Search />
      </div>
      <div>
        <Profile />
      </div>
    </nav>
  );
};

export default Nav;
