"use server";
import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default async function  SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="w-80 h-10" type="submit">
        Sign In With Google
      </Button>
    </form>
  );
}
