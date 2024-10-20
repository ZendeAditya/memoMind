"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

interface ThemeType {
  theme: string;
  setMode: (value: string) => void;
}
export const ThemeValue = createContext<ThemeType>({
  theme: "dark",
  setMode: () => {},
});

const ThemeContext = ({ children }: Props) => {
  const [mode, setMode] = useState<string>("dark");
  useEffect(() => {
    document.body.className =
      mode === "dark" ? "bg-gray-900 text-white duration-300 ease-in animate" : "bg-white text-gray-900 duration-300 ease-in animate";
  }, [mode]);
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeValue.Provider value={{ theme: mode, setMode: toggleMode }}>
      {children}
    </ThemeValue.Provider>
  );
};

export default ThemeContext;
