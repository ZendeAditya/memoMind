import { getAllNoteByUser } from "@/app/actions/notes.action";
import Image from "next/image";
import DeleteButton from "../Buttons/DeleteButton";
export interface Note {
  _id: string;
  title: string;
  slug: string;
  content: string;
  file?: string | null;
  isArchived: boolean;
  isPin: boolean;
  user: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
const DisplayAllNotes = async () => {
  const fetchedNotes = await getAllNoteByUser();
  const notes: Note[] = fetchedNotes || [];
  if (notes.length > 0) {
    notes.reverse();
  }
  const pinnedNotes = notes.filter((note) => note.isPin && !note.isDeleted);
  const unpinnedNotes = notes.filter((note) => !note.isPin);

  return (
    <div className="mx-10 px-10">
      <h1 className="text-3xl py-2 px-2 rounded-lg">Pinned Notes</h1>
      {pinnedNotes.length > 0 ? (
        pinnedNotes.map((note) => (
          <div
            key={note._id}
            className="w-[30rem] p-3 h-auto m-2 rounded-lg border-2 border-gray-500 group relative group"
          >
            <div
              id="buttons"
              className="flex gap-2 relative opacity-0 group-hover:opacity-100"
            >
              <DeleteButton id={note._id.toString()} />
            </div>
            <h2>{note.title}</h2>
            <div>{note.content}</div>
            {note.file && (
              <Image
                src={note.file.toString()}
                alt={note.title}
                width="200"
                height={400}
              />
            )}
            <div>Is Pinned: {note.isPin ? "Yes" : "No"}</div>
            <div>{note.user.toString()}</div>
            <div>{note.slug}</div>
            <div>{note.isDeleted}</div>
          </div>
        ))
      ) : (
        <p>No pinned notes available.</p>
      )}

      <h1 className="text-3xl py-2 px-2 rounded-lg">All Notes</h1>
      {unpinnedNotes.length > 0 ? (
        unpinnedNotes.map((note) => (
          <div
            key={note._id}
            className="w-full p-3 h-72 m-2 rounded-lg border-2 border-gray-500 relative"
          >
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            {note.file && (
              <Image
                src={note.file.toString()}
                alt={note.title}
                width="200"
                height={400}
              />
            )}
            <p>Is Pinned: {note.isPin ? "Yes" : "No"}</p>
            <p>{note.user.toString()}</p>
            <p>{note.slug}</p>
          </div>
        ))
      ) : (
        <p>No unpinned notes available.</p>
      )}
    </div>
  );
};
export default DisplayAllNotes;
