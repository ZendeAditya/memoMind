import { signIn } from "@/auth";
import { Button } from "../ui/button";
import React from "react";
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="py-2 px-2 w-52 h-10">
        Signin with Google
      </Button>
    </form>
  );
}
