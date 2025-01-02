"use client";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import React from "react";
import { DeleteNoteById } from "@/app/actions/notes.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteNoteButton = ({ id }: { id: string }) => {
  const deleteNote = async () => {
    const msg = await DeleteNoteById(id);
    console.log(msg);
  };

  return (
    <div>
      <Button className="invisible group-hover:visible text-3xl rounded-full border border-gray-400 absolute right-0 py-2 px-2 top-0 cursor-pointer my-2 mx-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <MdOutlineDeleteOutline size={24} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                note and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteNote}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Button>
    </div>
  );
};

export default DeleteNoteButton;
