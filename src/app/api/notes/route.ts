import { connectdb } from "@/lib/db/connect";
import { Note } from "@/lib/db/models/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        await connectdb();

        console.log("server log : ", body)
        const title = body.title;
        const desc = body.textState;
        const file = body.file;
        const newNote = await Note.create({
            title: title,
            slug: title,
            content: desc,
            isArchived: false,
            file: file,
            createAt: Date.now(),
        });

        console.log("NewNote : -->", newNote)

        return NextResponse.json({ message: "Note saved successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Something went wrong! The note is not saved", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}