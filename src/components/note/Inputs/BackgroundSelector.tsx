import React from "react";
import BackgroundTheme from "../Buttons/BackgroundTheme";

interface BackgroundSelectorProps {
  open: boolean;
  handleBackgroundSelect: (color: string, imageUrl: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  open,
  handleBackgroundSelect,
}) => {
  return (
    <div className="absolute left-19 top-12">
      {open && <BackgroundTheme onSelect={handleBackgroundSelect} />}
    </div>
  );
};

export default BackgroundSelector;
