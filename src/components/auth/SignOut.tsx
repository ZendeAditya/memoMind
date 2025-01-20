import { signOut } from "@/auth";
import { Button } from "../ui/button";
import React from "react";
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="w-40 py-2 px-2 m-2">
        Sign Out
      </Button>
    </form>
  );
}
