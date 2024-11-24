"use server";
interface NoteData {
    title: string | null;
    textState: string | null;
    image: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const saveNotes = async (data: NoteData) => {
    try {
        console.log("data from server action : ", data);
        
    } catch (error) {
        console.error("Error saving notes: ", error);
    }
}