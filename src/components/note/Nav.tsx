import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Profile from "@/components/auth/Profile";
import { SignOut } from "../auth/SignOut";
type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="flex items-center justify-between border-b-2 py-2 shadow-md">
      <div className="flex items-center justify-between">
        <h2>MemoMind</h2>
      </div>
      <div>
        {/* search box  */}
        <form action="" className="flex items-center justify-between gap-2">
          <Input className="border-2 w-96 " />
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
