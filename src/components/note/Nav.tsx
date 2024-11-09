import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Profile from "@/components/auth/Profile";
import { SignOut } from "../auth/SignOut";
import Sidebar from "./Sidebar";
import DarkMode from "../landing/DarkMode";
const Nav = () => {
  return (
    <nav className="flex items-center justify-between border-b-2 py-2 shadow-md px-2 ">
      <div className="flex items-center justify-between">
        <div>
          <Sidebar />
        </div>
        <div>
          <h2 className="text-3xl px-2 py-2">MemoMind</h2>
        </div>
        <div>
          <DarkMode />
        </div>
      </div>
      <div>
        {/* search box  */}
        <form action="" className="flex items-center justify-between gap-2">
          <Input
            className="border-2 w-96 border-gray-600"
            placeholder="Search Notes...!"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="flex items-center justify-between">
        <Profile />
        <SignOut />
      </div>
    </nav>
  );
};

export default Nav;
