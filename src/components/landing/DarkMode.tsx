"use client";

import { ThemeValue } from "@/app/context/theme";
import React, { useContext } from "react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
const DarkMode = () => {
  const { theme, setMode } = useContext(ThemeValue);
  console.log(theme);
  return (
    <button className=" dark:bg-white px-3" onClick={() => setMode("light")}>
      {theme == "dark" ? <FaSun size={25} /> : <FaMoon size={25} />}
    </button>
  );
};

export default DarkMode;
