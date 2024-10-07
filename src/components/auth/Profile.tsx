import { auth } from "@/auth";
import Image from "next/image";
export default async function UserAvatar() {
  const session = await auth();
  console.log(session);
  if (!session?.user) return null;
  console.log("Name of the user is : ", session.user.name);
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
