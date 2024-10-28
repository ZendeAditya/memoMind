import Image from "next/image";
import React, { useState } from "react";

interface Colors {
  hex: string;
}

interface Image {
  url: string;
}

const BackgroundTheme = () => {
  const colors: Colors[] = [
    { hex: "red" },
    { hex: "blue" },
    { hex: "orange" },
    { hex: "gray" },
    { hex: "yellow" },
  ];

  const images: Image[] = [
    { url: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Image1" },
    { url: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Image2" },
    { url: "https://via.placeholder.com/150/3357FF/FFFFFF?text=Image3" },
    { url: "https://via.placeholder.com/150/F1C40F/FFFFFF?text=Image4" },
    { url: "https://via.placeholder.com/150/8E44AD/FFFFFF?text=Image5" },
  ];

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleColorSelect = (color: string, imageUrl: string) => {
    setSelectedColor(color);
    setSelectedImage(imageUrl);
  };

  return (
    <div className="w-96 h-20 rounded-lg border-2 border-gray-400 p-4">
      <div className="flex gap-4">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorSelect(color.hex, images[index].url)}
            className="flex items-center gap-2"
          >
            <div
              style={{ backgroundColor: color.hex }}
              className="w-10 h-10 rounded-full"
            ></div>
          </button>
        ))}
      </div>
      {selectedImage && (
        <div className="mt-4">
          <Image
            src={selectedImage}
            alt="Selected"
            className="w-32 h-32"
            width={500}
            height={400}
          />
          <p>Selected Color: {selectedColor}</p>
        </div>
      )}
    </div>
  );
};

export default BackgroundTheme;
