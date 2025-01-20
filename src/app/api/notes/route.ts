import  connectdb  from "@/lib/db/connect";
import { Note, User } from "@/lib/db/models/schema";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const getSessionUser = async () => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized: No valid session found");
    }
    return session.user;
  } catch (error) {
    console.error("Error in getSessionUser:", error);
    throw new Error("Failed to authenticate user");
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await connectdb();
    const user = await getSessionUser();

    const title = body.title;
    const desc = body.textState;
    const file = body.image;
    const archived = body.isArchived;
    const pin = body.pin;
    const userId = await User.findOne({ email: user.email });

    if (!userId) {
      console.error("User not found!");
    }
    const newNote = await Note.create({
      title: title,
      slug: title,
      content: desc,
      isArchived: archived,
      isPin: pin,
      file: file,
      user: userId,
      isDeleted: false,
      createAt: Date.now(),
    });
    console.log("newNote : ", newNote);
    return NextResponse.json(
      { message: "Note saved successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Something went wrong! The note is not saved", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message === "Unauthorized"
            ? "Unauthorized"
            : "Internal Server Error",
      },
      { status: (error as Error).message === "Unauthorized" ? 401 : 500 },
    );
  }
};

export const dynamic = 'force-dynamic'
