import { saveUserData } from "@/app/actions/user.actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

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
  const imgUrl = session.user.image!;
  return (
    <div>
      {session.user?.image ? (
        <div className="relative">
          <div className="overflow-hidden rounded-full w-16 h-16 hover:opacity-75">
            <Image
              src={imgUrl}
              alt={session.user.name || "User Avatar"}
              layout="responsive"
              width={20}
              height={20}
              className="rounded-full w-20 h-20"
            />
          </div>
        </div>
      ) : (
        <h2>Welcome to our app</h2>
      )}
    </div>
  );
}
