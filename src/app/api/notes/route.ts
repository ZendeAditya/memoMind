import { connectdb } from "@/lib/db/connect";
import { Note, User } from "@/lib/db/models/schema";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        await connectdb();
        const session = await auth();
        if (!session || !session.user) return null;
        console.log(session.user.email);
        console.log("server log : ", body);
        const title = body.title;
        const desc = body.textState;
        const file = body.image;
        const archived = body.isArchived;
        const pin = body.pin;
        console.log("file : ", body.image);
        const userId = await User.findOne({ email: session.user.email });

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
            createAt: Date.now(),
        });

        console.log("NewNote : -->", newNote);

        return NextResponse.json({ message: "Note saved successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Something went wrong! The note is not saved", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}