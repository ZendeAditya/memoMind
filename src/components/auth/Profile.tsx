import { saveUserData } from "@/app/actions/user.actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
          <Avatar>
            <AvatarImage src={`${imgUrl}`} />
            <AvatarFallback className="text-black bg-white  ">
              {session.user.name?.trim().slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <h2>Welcome to our app</h2>
      )}
    </div>
  );
}
