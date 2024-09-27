import React from "react";
type Props = object;
import demo from "../../../assets/demo.mp4";
import Video from "next-video";
const Work = (_props: Props) => {
  return (
    <div className="w-screen hero min-h-screen">
      <h2 className="text-center text-3xl py-2">Get Started in 3 Easy Steps</h2>
      <div className="flex items-center justify-center min-h-screen">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/XDqEvmxnLeY?si=ERGgVpjYOVnqu5JU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="lg:w-[50rem] w-96 h-96 rounded-lg shadow-lgls
          "
        ></iframe>
      </div>
      <div className="text-center  py-4">
        <p>Copyright 2023 MemoMind. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Work;
