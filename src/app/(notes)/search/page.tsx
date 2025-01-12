"use client";
import React, { useEffect, useCallback } from "react";

import { useSearchParams } from "next/navigation";
import { searchNote } from "@/app/actions/notes.action";

// import { Note as DisplayNote } from "@/components/note/DisplayNotes/DisplayAllNotes";
import DeleteButton from "@/components/note/Buttons/DeleteButton";
import Image from "next/image";

interface Note {
  _id: string;
  title: string;
  content: string;
  isPin: boolean;
  file?: string;
  user: string;
  slug: string;
  isDeleted: boolean;
  createdAt?: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();

  const search: string | null = searchParams.get("search");
  const [notes, setNotes] = React.useState<Note[]>([]);

  const searchResult = useCallback(async () => {
    if (search && search.length > 0) {
      try {
        const res: Note[] = await searchNote(search);
        setNotes(res);
      } catch (error) {
        console.log(error);
      }
    }
  }, [search]);

  useEffect(() => {
    searchResult();
  }, [search, searchResult]);

  return (
    <div className="flex items-center justify-center gap-3 px-2 py-2">
      {notes.length > 0 ? (
        notes.map((note) => (
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
        <p>No Search Result Available!</p>
      )}
    </div>
  );
};

export default SearchPage;
