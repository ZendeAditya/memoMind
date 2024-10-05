import { Button } from "../ui/button";
import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/note" });
      }}
    >
      <Button className="w-80 h-10" type="submit" name="action" value="google">
        Sign In With Google
      </Button>
    </form>
  );
}
