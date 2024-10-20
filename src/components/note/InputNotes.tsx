"use client";
import React, { FormEvent, useState } from "react";
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
import { MdLabel } from "react-icons/md";
import { FaChalkboard } from "react-icons/fa";

interface IconItem {
  name: string;
  icon: JSX.Element;
}

document.addEventListener("click", function (event) {
  event.preventDefault();
});

const iconItems: IconItem[] = [
  { name: "Background", icon: <TbBackground /> },
  { name: "Image", icon: <CiImageOn /> },
  { name: "Archive", icon: <MdArchive /> },
  { name: "Label", icon: <MdLabel /> },
  { name: "Drawing", icon: <FaChalkboard /> },
];

const InputNotes = () => {
  const [Title, setTitle] = useState<boolean>(false);
  const [Pin, setPin] = useState<boolean>(false);

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
              <div className="w-[32rem] h-[15rem] rounded-lg border-2 border-gray-500 py-2 px-2 outline-none ">
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
                  placeholder="Take a note...!"
                  className="py-2 my-2 outline-none border-transparent resize-none"
                  rows={5}
                  cols={30}
                />
                <div className="flex gap-2 ">
                  {iconItems.map((item) => (
                    <Button key={item.name} className="rounded-t-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{item.icon}</TooltipTrigger>
                          <TooltipContent>{item.name}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Button>
                  ))}
                </div>
              </div>
            </form>
          </div>
          <button onClick={() => setTitle(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default InputNotes;
