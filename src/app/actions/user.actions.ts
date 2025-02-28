"use server";
import connectdb from "@/lib/db/connect";
import { User } from "@/lib/db/models/schema";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export async function saveUserData(session: Session | null) {
  // console.log(session);
  if (!session || !session.user) {
    throw new Error("No session provided");
  }

  try {
    await connectdb();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const existingUser = await User.findOne({ email: session.user.email });

    // if (existingUser) {
    //     throw new Error('User already exists with this email');
    // }

    const newUser = await User.create({
      _id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      img: session.user.image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    setTimeout(() => {
      revalidatePath("/note");
    }, 0);

    return { success: true, user: newUser.toObject() };
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
}
