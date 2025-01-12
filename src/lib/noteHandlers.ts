import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleTextChange = (
  e: ChangeEvent<HTMLTextAreaElement>,
  setText: Dispatch<SetStateAction<string>>,
  textStates: string[],
  setTextStates: Dispatch<SetStateAction<string[]>>,
  currentStateIndex: number,
  setCurrentStateIndex: Dispatch<SetStateAction<number>>,
) => {
  e.preventDefault();
  const newText = e.target.value;
  setText(newText);

  const newStates = [...textStates.slice(0, currentStateIndex + 1), newText];
  setTextStates(newStates);
  setCurrentStateIndex(newStates.length - 1);
};

export const handleUndo = (
  e: React.MouseEvent,
  currentStateIndex: number,
  setCurrentStateIndex: Dispatch<SetStateAction<number>>,
  textStates: string[],
  setText: Dispatch<SetStateAction<string>>,
) => {
  e.preventDefault();
  if (currentStateIndex > 0) {
    setCurrentStateIndex(currentStateIndex - 1);
    setText(textStates[currentStateIndex - 1]);
  }
};

export const handleRedo = (
  e: React.MouseEvent,
  currentStateIndex: number,
  setCurrentStateIndex: Dispatch<SetStateAction<number>>,
  textStates: string[],
  setText: Dispatch<SetStateAction<string>>,
) => {
  e.preventDefault();
  if (currentStateIndex < textStates.length - 1) {
    setCurrentStateIndex(currentStateIndex + 1);
    setText(textStates[currentStateIndex + 1]);
  }
};
