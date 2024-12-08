import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

interface NoteInputProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  desc: string;
  setDesc: Dispatch<SetStateAction<string>>;
  pin: boolean;
  setPin: Dispatch<SetStateAction<boolean>>;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NoteInput = ({
  title,
  setTitle,
  desc,
  setDesc,
  pin,
  setPin,
  onTextChange,
}: NoteInputProps) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex items-center justify-between gap-2 relative flex-col">
      <div className="w-full flex items-center gap-2">
        <Input
          placeholder="Title!"
          name="title"
          className="my-2 outline-none border-transparent w-full"
          value={title}
          onChange={handleTitleChange}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setPin((prev) => !prev);
          }}
        >
          {pin ? <MdPushPin size={30} /> : <MdOutlinePushPin size={30} />}
        </button>
      </div>
      <Textarea
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
          onTextChange(e);
        }}
        placeholder="Take a note...!"
        className="py-2 my-2 outline-none border-transparent resize-none"
        rows={5}
        cols={30}
        name="desc"
      />
    </div>
  );
};

export default NoteInput;
