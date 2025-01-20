"use client";
import React from "react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Input } from "../../ui/input";
import {
  MdArchive,
  MdLabel,
  MdOutlineUndo,
  MdOutlineRedo,
} from "react-icons/md";
import { TbBackground } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { FaChalkboard } from "react-icons/fa";
import { Button } from "../../ui/button";
import NoteInput from "./NoteInput";
import IconButtons from "./IconButtons";
import ImagePreview from "./ImagePreview";
import BackgroundSelector from "./BackgroundSelector";
import {
  handleTextChange,
  handleUndo,
  handleRedo,
} from "../../../lib/noteHandlers";

let bgcolor: string | undefined = undefined;
let bgimage: string | undefined = undefined;

type IconItem = {
  name: string;
  icon: JSX.Element;
  onClick: (e: React.MouseEvent) => void;
};

const handleUndoWrapper = (
  e: React.MouseEvent<HTMLButtonElement>,
  currentStateIndex: number,
  setCurrentStateIndex: Dispatch<SetStateAction<number>>,
  textStates: string[],
  setText: Dispatch<SetStateAction<string>>,
) => {
  handleUndo(e, currentStateIndex, setCurrentStateIndex, textStates, setText);
};

const handleRedoWrapper = (
  e: React.MouseEvent<HTMLButtonElement>,
  currentStateIndex: number,
  setCurrentStateIndex: Dispatch<SetStateAction<number>>,
  textStates: string[],
  setText: Dispatch<SetStateAction<string>>,
) => {
  handleRedo(e, currentStateIndex, setCurrentStateIndex, textStates, setText);
};

const InputNotes = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [pin, setPin] = useState<boolean>(false);
  const [archived, setArchived] = useState<boolean>(false);
  const [openTextBox, setOpenTextBox] = useState<boolean>(false);
  const [textStates, setTextStates] = useState<string[]>([""]);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [backgroundImg, setBackgroundImg] = useState<File | null>(null);
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    {
      name: "Undo",
      icon: <MdOutlineUndo />,
      onClick: (e) =>
        handleUndoWrapper(
          e as React.MouseEvent<HTMLButtonElement>,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setDesc,
        ),
    },
    {
      name: "Redo",
      icon: <MdOutlineRedo />,
      onClick: (e) =>
        handleRedoWrapper(
          e as React.MouseEvent<HTMLButtonElement>,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setDesc,
        ),
    },
  ];
  const handleTextChangeWrapper = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleTextChange(
      e,
      setDesc,
      textStates,
      setTextStates,
      currentStateIndex,
      setCurrentStateIndex,
    );
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.name = "file";
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
    const confirmArchive = window.confirm(
      "Are you sure you want to archive this note?",
    );
    if (confirmArchive) {
      setArchived(true);
      console.log("Archive button clicked");
    }
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

  const handleSaveNotes = async (
    e: FormEvent,
    stagedFile: File | Blob | null,
  ) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    console.log("Save notes function called");
    const datas = {
      title: String(formData.get("title")),
      textState: String(formData.get("desc")),
      image: null,
      isArchived: archived,
      pin: pin,
    };
    const titleValue = title.trim();
    const descValue = desc.trim();

    if (!titleValue || !descValue) {
      alert("Title and description cannot be empty.");
      setLoading(false);
      return;
    }

    if (stagedFile) {
      formData.append("file", stagedFile);
    }

    try {
      if (stagedFile) {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        const data = await res.json();
        datas.image = data.imgUrl;
      }

      const response = await fetch("api/notes", {
        method: "POST",
        body: JSON.stringify(datas),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const note = await response.json();
      console.log("note : ", note);
      if (response.ok) {
        setTitle("");
        setDesc("");
        setBackgroundImg(null);
        setShowRemoveButton(false);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
    setLoading(false);
  };

  const handleButtonClick = (action: string, e: React.MouseEvent) => {
    e.preventDefault();
    switch (action) {
      case "background":
        handleBackgroundClick(e);
        break;
      case "Image":
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
      case "undo":
        handleUndoWrapper(
          e as React.MouseEvent<HTMLButtonElement>,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setDesc,
        );
        break;
      case "redo":
        handleRedoWrapper(
          e as React.MouseEvent<HTMLButtonElement>,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setDesc,
        );
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  return (
    <div className="w-full max-w-[95%] mx-auto sm:max-w-[38rem]">
      <div>
        {!openTextBox && (
          <Input
            className="w-full lg:w-[38rem] rounded-lg shadow-md py-5"
            placeholder="Take a note!"
            onFocus={() => setOpenTextBox(true)}
            onClick={() => setOpenTextBox(true)}
          />
        )}
      </div>
      {openTextBox && (
        <div className="w-full">
          <form
            onSubmit={(e) => handleSaveNotes(e, backgroundImg!)}
            className="w-full"
          >
            <div className="w-full rounded-lg border-2 border-gray-500 py-2 px-2 outline-none">
              <ImagePreview
                backgroundImg={backgroundImg}
                setBackgroundImg={setBackgroundImg}
                showRemoveButton={showRemoveButton}
                setShowRemoveButton={setShowRemoveButton}
              />
              <main
                className={`w-full ${
                  bgcolor != undefined ? `bg-${bgcolor}-500` : "bg-transparent"
                }`}
                style={{
                  backgroundImage:
                    bgimage != undefined ? `url(${bgimage})` : undefined,
                }}
              >
                <NoteInput
                  title={title}
                  setTitle={setTitle}
                  desc={desc}
                  setDesc={setDesc}
                  pin={pin}
                  setPin={setPin}
                  onTextChange={handleTextChangeWrapper}
                />
                <section className="flex flex-col sm:flex-row items-center justify-between px-2 gap-4">
                  <div className="w-full sm:w-auto overflow-x-auto">
                    <IconButtons
                      iconItems={iconItems}
                      onButtonClick={handleButtonClick}
                    />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <Button
                      onClick={() => setOpenTextBox(false)}
                      className="px-3 py-1 text-sm sm:text-base sm:px-4 sm:py-2"
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-3 py-1 text-sm sm:text-base sm:px-4 sm:py-2"
                    >
                      {loading ? <Spinner /> : "Save"}
                    </Button>
                  </div>
                </section>
                <BackgroundSelector
                  open={open}
                  handleBackgroundSelect={handleBackgroundSelect}
                />
              </main>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
const Spinner = () => <div className="loader">Saving...</div>;
export { handleUndoWrapper, handleRedoWrapper };
export default InputNotes;
