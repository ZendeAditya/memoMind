"use client";
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
  setText: Dispatch<SetStateAction<string>>
) => {
  handleUndo(e, currentStateIndex, setCurrentStateIndex, textStates, setText);
};

const handleRedoWrapper = (
  e: React.MouseEvent<HTMLButtonElement>,
  currentStateIndex: number,
  setCurrentStateIndex: Dispatch<SetStateAction<number>>,
  textStates: string[],
  setText: Dispatch<SetStateAction<string>>
) => {
  handleRedo(e, currentStateIndex, setCurrentStateIndex, textStates, setText);
};

const InputNotes = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [pin, setPin] = useState<boolean>(false);
  const [opneTextBox, setOpenTextBox] = useState<boolean>(false);
  const [textStates, setTextStates] = useState<string[]>([""]);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [backgroundImg, setBackgroundImg] = useState<File | null>(null);
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);

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
          e,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setText
        ),
    },
    {
      name: "Redo",
      icon: <MdOutlineRedo />,
      onClick: (e) =>
        handleRedoWrapper(
          e,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setText
        ),
    },
  ];

  const handleTextChangeWrapper = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleTextChange(
      e,
      setText,
      textStates,
      setTextStates,
      currentStateIndex,
      setCurrentStateIndex
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

  const handleSaveNotes = async (e: FormEvent, stagedFile: File | Blob) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const datas = {
      title: formData.get("title"),
      textState: formData.get("desc"),
      image: null,
    };

    if (stagedFile) {
      formData.append("file", stagedFile);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();
      datas.image = data.imgUrl;
      console.log("api response : ", data);
      console.log("cloudinary url : ", data.imgUrl);
    }

    console.log("Data to be saved: local", datas);
    console.log("data saved!");
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
          e,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setText
        );
        break;
      case "redo":
        handleRedoWrapper(
          e,
          currentStateIndex,
          setCurrentStateIndex,
          textStates,
          setText
        );
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  return (
    <div>
      <div>
        {!isOpen && (
          <Input
            className="w-[32rem] rounded-lg shadow-md py-5"
            placeholder="Take a note!"
            onFocus={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
      {isOpen && (
        <div>
          <div className="relative">
            <form onSubmit={(e) => handleSaveNotes(e, backgroundImg!)}>
              <div className="w-[38rem] h-auto rounded-lg border-2 border-gray-500 py-2 px-2 outline-none ">
                <ImagePreview
                  backgroundImg={backgroundImg}
                  setBackgroundImg={setBackgroundImg}
                  showRemoveButton={showRemoveButton}
                  setShowRemoveButton={setShowRemoveButton}
                />
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
                  <NoteInput
                    title={title}
                    setTitle={setTitle}
                    desc={desc}
                    setDesc={setDesc}
                    pin={pin}
                    setPin={setPin}
                    onTextChange={handleTextChangeWrapper}
                  />
                  <section className="flex items-center justify-between px-2">
                    <IconButtons
                      iconItems={iconItems}
                      onButtonClick={handleButtonClick}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => setOpenTextBox(false)}>
                        Close
                      </Button>
                      <Button type="submit">Save</Button>
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
        </div>
      )}
    </div>
  );
};

export { handleUndoWrapper, handleRedoWrapper };
export default InputNotes;
