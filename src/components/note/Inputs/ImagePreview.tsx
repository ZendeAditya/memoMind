import React from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

interface ImagePreviewProps {
  backgroundImg: File | null;
  setBackgroundImg: (img: File | null) => void;
  showRemoveButton: boolean;
  setShowRemoveButton: (show: boolean) => void;
}

const ImagePreview = ({
  backgroundImg,
  setBackgroundImg,
  showRemoveButton,
  setShowRemoveButton,
}: ImagePreviewProps) => {
  return (
    <>
      {backgroundImg && (
        <Image
          src={URL.createObjectURL(backgroundImg)}
          alt="sample image"
          className="w-[38rem] h-[15rem] rounded-lg object-contain"
          width={600}
          height={200}
        />
      )}
      {showRemoveButton && (
        <button
          className="rounded-full absolute py-2 px-3 w-10 top-0"
          onClick={() => {
            setBackgroundImg(null);
            setShowRemoveButton(false);
          }}
        >
          <RxCross2 size={27} />
        </button>
      )}
    </>
  );
};

export default ImagePreview;
