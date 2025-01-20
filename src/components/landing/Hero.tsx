import React from "react";
import { Button } from "../ui/button";
import Nav from "./Nav";

const Hero = () => {
  return (
    <>
      <Nav />
      <div className="hero w-screen min-h-screen flex items-center justify-center px-4">
        <div className="lg:px-20 flex flex-col text-center items-center justify-center gap-5">
          <h2 className="text-4xl font-[900]">
            Capture and Organize Your Thoughts!!
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl">
            Stay organized, stress-free, and productive with
            <span className="font-bold border-b-2 border border-b-yellow-500">
              MemoMind.
            </span>
          </p>
          <Button className="w-40 h-12 m-2 font-semibold bg-yellow-500 hover:bg-yellow-600">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
