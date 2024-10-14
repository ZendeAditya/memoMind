import { connectdb } from "@/lib/db/connect";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
interface User {
    name: string | null | undefined,
    email: string | null | undefined,
    img: string | null | undefined
}
export const POST = async (session: Session | null) => {
    if (session === null) {
        throw new Error("Somthing went wrong!");
    }
    await connectdb();

    console.log("The session is : ", session.user?.name);
    const user: User = {
        name: session.user?.name,
        email: session.user?.email,
        img: session.user?.image
    }
    return NextResponse.json(user, { status: 200 });
};