import { saveUserData } from "@/app/actions/user.actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "./SignOut";
import DarkMode from "../landing/DarkMode";

export default async function UserAvatar() {
  const session = await auth();
  saveUserData(session);

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session?.expires) {
    const expirationTime = new Date(session.expires).getTime();
    const currentTime = Date.now();
    const timeout = expirationTime - currentTime;

    const maxTimeout = 2147483647;
    const effectiveTimeout = Math.min(timeout, maxTimeout);

    if (effectiveTimeout > 0) {
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, effectiveTimeout);
    }
  }

  if (!session?.user) return null;
  const imgUrl = session.user.image!;
  return (
    <div>
      {session.user?.image ? (
        <div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={imgUrl}
                  alt={session.user.name || "User Avatar"}
                  layout="fixed"
                  height={64}
                  width={64}
                  className="rounded-full w-auto h-auto"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <DarkMode />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <h2>Welcome to our app</h2>
      )}
    </div>
  );
}
