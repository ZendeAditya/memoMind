import { signOut } from "@/auth";
import { Button } from "../ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/sign-in" });
      }}
    >
      <Button
        className="py-2 bg-red-500 w-20 rounded-lg shadow-lg p-2 m-2"
        type="submit"
      >
        Sign Out
      </Button>
    </form>
  );
}
