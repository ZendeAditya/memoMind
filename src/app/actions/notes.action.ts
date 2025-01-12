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
  }
};

export const DeleteNoteById = async (id: string) => {
  try {
    const result = await Note.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    ).exec();
    if (!result) {
      throw new Error("Note not found");
    }
    return { message: "Note deleted successfully" };
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
};

export const getNoteById = async (_id: string) => {
  try {
    const note = await Note.findOne({ _id: _id }).exec();
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to Fetch note");
  }
};

export const updateNote = async (
  id: string,
  updatedNote: {
    title: string;
    content: string;
    pin: boolean;
    archived: boolean;
  },
) => {
  try {
    const note = await Note.findByIdAndUpdate(
      id,
      {
        title: updatedNote.title,
        content: updatedNote.content,
        pin: updatedNote.pin,
        archived: updatedNote.archived,
      },
      { new: true },
    );

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  } catch (error) {
    console.error("Failed to update note:", error);
    throw error;
  }
};

export async function searchNote(search: string) {
  try {
    const notes = await Note.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    });

    // Serialize the notes before returning
    return notes.map((note) => ({
      _id: note._id.toString(),
      title: note.title,
      content: note.content,
      isPin: note.isPin,
      file: note.file?.toString(),
      user: note.user.toString(),
      slug: note.slug,
      isDeleted: note.isDeleted,
      createdAt: note.createdAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
