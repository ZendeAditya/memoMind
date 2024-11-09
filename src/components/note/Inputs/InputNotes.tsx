"use client";
import React, { FormEvent, useState, useCallback } from "react";
import { Input } from "../../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

import { RxCross2 } from "react-icons/rx";
import { Textarea } from "../../ui/textarea";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { Button } from "../../ui/button";
import { TbBackground } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { MdArchive } from "react-icons/md";
import { MdLabel, MdOutlineUndo, MdOutlineRedo } from "react-icons/md";
import { FaChalkboard } from "react-icons/fa";
import BackgroundTheme from "../Buttons/BackgroundTheme";
import Image from "next/image";

let bgcolor: string | undefined = undefined;
let bgimage: string | undefined = undefined;
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
  const [open, setOpen] = useState<boolean>(false);
  const [backgroundImg, setBackgroundImg] = useState<File | null>(null);
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);

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

  const handleButtonClick = (action: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Button clicked: ${action}`);
    switch (action) {
      case "background":
        handleBackgroundClick(e);
        break;
      case "image":
        handleImageClick(e);
        break;
      case "archive":
        handleArchiveClick(e);
        break;
      case "label":
        handleLabelClick(e);
        break;
      case "drawing":
        handleDrawingClick(e);
        break;
      default:
        break;
    }
  };
  const iconItems: IconItem[] = [
    {
      name: "Background",
      icon: <TbBackground />,
      onClick: (e) => handleButtonClick("background", e),
    },
    {
      name: "Image",
      icon: <CiImageOn />,
      onClick: (e) => handleButtonClick("image", e),
    },
    {
      name: "Archive",
      icon: <MdArchive />,
      onClick: (e) => handleButtonClick("archive", e),
    },
    {
      name: "Label",
      icon: <MdLabel />,
      onClick: (e) => handleButtonClick("label", e),
    },
    {
      name: "Drawing",
      icon: <FaChalkboard />,
      onClick: (e) => handleButtonClick("drawing", e),
    },
    { name: "Undo", icon: <MdOutlineUndo />, onClick: handleUndo },
    { name: "Redo", icon: <MdOutlineRedo />, onClick: handleRedo },
  ];

  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setBackgroundImg(files[0]);
        setShowRemoveButton(true);
      }
    };
    fileInput.click();
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Archive button clicked");
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Label button clicked");
  };

  const handleDrawingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Drawing button clicked");
  };

  const handleBackgroundSelect = (color: string, imageUrl: string) => {
    console.log("Selected color:", color);
    console.log("Selected image URL:", imageUrl);
    bgcolor = color;
    bgimage = imageUrl;
  };
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
          <div className="relative">
            <form>
              <div className="w-[38rem] h-auto rounded-lg border-2 border-gray-500 py-2 px-2 outline-none ">
                {backgroundImg && (
                  <Image
                    // src="https://plus.unsplash.com/premium_vector-1721494020721-45d7295df5e0?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    src={
                      backgroundImg ? URL.createObjectURL(backgroundImg) : ""
                    }
                    alt="sample image"
                    className="w-[38rem] h-[15rem] rounded-lg object-contain"
                    width={600}
                    height={200}
                  />
                )}
                {showRemoveButton && (
                  <button
                    className="rounded-full absolute  py-2 px-3 w-10  top-0 "
                    onClick={() => {
                      setBackgroundImg(null);
                      setShowRemoveButton(false);
                    }}
                  >
                    <RxCross2 size={27}/>
                  </button>
                )}
                <main
                  className={`${
                    bgcolor != undefined
                      ? `bg-${bgcolor}-500`
                      : "bg-transparent"
                  }`}
                  style={{
                    backgroundImage:
                      bgimage != undefined ? `url(${bgimage})` : undefined,
                  }}
                >
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
                    <div className="flex gap-2 relative">
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
                      <div className="absolute left-19 top-12">
                        {open && (
                          <BackgroundTheme onSelect={handleBackgroundSelect} />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setTitle(false)}>Close</Button>
                      <Button onClick={() => setTitle(false)}>Save</Button>
                    </div>
                  </section>
                </main>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputNotes;
