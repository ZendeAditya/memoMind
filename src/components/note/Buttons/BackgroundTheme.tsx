import { colors, images } from "@/lib/backgrounds";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import React, { useState } from "react";

interface BackgroundThemeProps {
  onSelect: (color: string, imageUrl: string) => void;
}

const BackgroundTheme: React.FC<BackgroundThemeProps> = ({ onSelect }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelect(color, selectedImage!);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onSelect(selectedColor!, imageUrl);
  };

  return (
    <div className="w-96 h-28 rounded-lg border-2 border-gray-400 p-4">
      <div className="flex gap-4">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleColorSelect(color.hex);
            }}
            className="flex items-center gap-2"
          >
            <div
              style={{ backgroundColor: color.hex }}
              className="w-10 h-10 rounded-full"
            ></div>
          </button>
        ))}
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleImageSelect(img.url);
            }}
          >
            <Image
              src={img.url}
              alt={`Background image ${idx + 1}`}
              width={40}
              height={40}
              className="rounded-full border-2 w-10 cursor-pointer object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundTheme;
