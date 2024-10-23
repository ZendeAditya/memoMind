"use client";
import React, { FormEvent, useState, useCallback } from "react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Textarea } from "../ui/textarea";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { Button } from "../ui/button";
import { TbBackground } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { MdArchive } from "react-icons/md";
import { MdLabel, MdOutlineUndo, MdOutlineRedo } from "react-icons/md";
import { FaChalkboard } from "react-icons/fa";

interface IconItem {
  name: string;
  icon?: JSX.Element;
  onClick?: (e: React.MouseEvent) => void;
}

const InputNotes = () => {
  const [Title, setTitle] = useState<boolean>(false);
  const [Pin, setPin] = useState<boolean>(false);
  const [textStates, setTextStates] = useState<string[]>([""]);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const newText = e.target.value;
    setText(newText);

    const newStates = [...textStates.slice(0, currentStateIndex + 1), newText];
    setTextStates(newStates);
    setCurrentStateIndex(newStates.length - 1);
  };

  const handleUndo = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (currentStateIndex > 0) {
        setCurrentStateIndex(currentStateIndex - 1);
        setText(textStates[currentStateIndex - 1]);
      }
    },
    [currentStateIndex, textStates]
  );

  const handleRedo = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (currentStateIndex < textStates.length - 1) {
        setCurrentStateIndex(currentStateIndex + 1);
        setText(textStates[currentStateIndex + 1]);
      }
    },
    [currentStateIndex, textStates]
  );

  const iconItems: IconItem[] = [
    { name: "Background", icon: <TbBackground /> },
    { name: "Image", icon: <CiImageOn /> },
    { name: "Archive", icon: <MdArchive /> },
    { name: "Label", icon: <MdLabel /> },
    { name: "Drawing", icon: <FaChalkboard /> },
    { name: "Undo", icon: <MdOutlineUndo />, onClick: handleUndo },
    { name: "Redo", icon: <MdOutlineRedo />, onClick: handleRedo },
  ];

  return (
    <div>
      <div>
        {!Title && (
          <Input
            className="w-[32rem] rounded-lg shadow-md py-5"
            placeholder="Take a note!"
            onFocus={() => setTitle(true)}
            onClick={() => setTitle(true)}
          />
        )}
      </div>
      {Title && (
        <div>
          <div className="noteform">
            <form>
              <div className="w-[38rem] h-[15rem] rounded-lg border-2 border-gray-500 py-2 px-2 outline-none ">
                <div className="flex items-center justify-between gap-2">
                  <Input
                    placeholder="Title"
                    className=" my-2 outline-none border-transparent w-full"
                  />
                  <button
                    onClick={(e: FormEvent) => {
                      e.preventDefault();
                      setPin((prev) => !prev);
                    }}
                  >
                    {Pin ? (
                      <MdOutlinePushPin size={30} />
                    ) : (
                      <MdPushPin size={30} />
                    )}
                  </button>
                </div>
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Take a note...!"
                  className="py-2 my-2 outline-none border-transparent resize-none"
                  rows={5}
                  cols={30}
                />
                <section className="flex items-center justify-between px-2">
                  <div className="flex gap-2 ">
                    {iconItems.map((item) => (
                      <Button
                        key={item.name}
                        className="rounded-full"
                        onClick={item.onClick}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>{item.icon}</TooltipTrigger>
                            <TooltipContent>{item.name}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setTitle(false)}>Close</Button>
                    <Button onClick={() => setTitle(false)}>Save</Button>
                  </div>
                </section>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputNotes;
