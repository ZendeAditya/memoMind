import { auth } from "@/auth";
import { Session } from "next-auth";
import Image from "next/image";

const handleSubmit = async (data: Session | null) => {
  // console.log('The data is : ',data);
  try {
    const response = await fetch("http://localhost:3000/api/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default async function UserAvatar() {
  const session = await auth();
  // console.log(session);
  handleSubmit(session);
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
