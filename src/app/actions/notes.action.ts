"use server";
import { auth } from "@/auth";
import { Note, User } from "@/lib/db/models/schema";

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

export const getAllNoteByUser = async () => {
    const user = await getSessionUser();
    try {
        const userRecord = await User.findOne({ email: user.email }).exec();
        if (!userRecord) {
            throw new Error("User not found");
        }
        
        const notes = await Note.find({ user: userRecord._id });
        return notes.length > 0 ? notes : [];
    } catch (error) {
        console.error("Error fetching user notes:", error);
        throw new Error("Failed to fetch notes");
    }
}

export const DeleteNoteById = async (id: string) => {
    try {
        const result = await Note.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
        if (!result) {
            throw new Error("Note not found");
        }
        return { message: "Note deleted successfully" };
    } catch (error) {
        console.error("Error deleting note:", error);
        throw new Error("Failed to delete note");
    }
}