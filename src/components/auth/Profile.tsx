import { saveUserData } from "@/app/actions/user.actions";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

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

    if (timeout > 0) {
      setTimeout(() => {
        redirect("/sign-in");
      }, timeout);
    }
  }

  if (!session?.user) return null;
  return (
    <div>
      {session.user?.image ? (
        <div className="relative">
          <Image
            src={session.user.image}
            alt="profile-Image"
            width={50}
            height={50}
            className="rounded-full px-2 object-contain"
          />
        </div>
      ) : (
        <h2>Welcome to our app</h2>
      )}
    </div>
  );
}
