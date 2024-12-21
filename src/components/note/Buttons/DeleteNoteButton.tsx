"use client";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import React from "react";
import { DeleteNoteById } from "@/app/actions/notes.action";

const DeleteNoteButton = ({ id }: { id: string }) => {
  const deleteNote = async () => {
    const msg = await DeleteNoteById(id);
    console.log(msg);
  };

  return (
    <div>
      <Button
        className="invisible group-hover:visible text-3xl rounded-full border border-gray-400 absolute right-0 py-2 px-2 top-0 cursor-pointer my-2 mx-2"
        onClick={deleteNote}
      >
        <MdOutlineDeleteOutline size={24} />
      </Button>
    </div>
  );
};

export default DeleteNoteButton;
