"use client";
import { useEffect, useState } from "react";
import { saveUserData } from "@/app/actions/user.actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";

export default function UserAvatar() {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await auth();
        if (sessionData) {
          saveUserData(sessionData);
          setSession(sessionData);
        } else {
          redirect("/sign-in");
        }

        if (sessionData?.expires) {
          const expirationTime = new Date(sessionData.expires).getTime();
          const currentTime = Date.now();
          const timeout = expirationTime - currentTime;

          if (timeout > 0) {
            setTimeout(() => {
              redirect("/sign-in");
            }, timeout);
          }
        }
      } catch (error) {
        console.log("Error fetching user session:", error);
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
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
