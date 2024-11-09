import React from "react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

interface IconItem {
  name: string;
  icon?: JSX.Element;
  onClick?: (e: React.MouseEvent) => void;
}

interface IconButtonsProps {
  iconItems: IconItem[];
  onButtonClick: (action: string, e: React.MouseEvent) => void;
}

const IconButtons = ({ iconItems, onButtonClick }: IconButtonsProps) => {
  return (
    <div className="flex gap-2 relative">
      {iconItems.map((item) => (
        <Button
          key={item.name}
          className="rounded-full"
          onClick={(e) => {
            item.onClick?.(e);
            onButtonClick(item.name, e);
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{item.icon}</TooltipTrigger>
              <TooltipContent>{item.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      ))}
    </div>
  );
};

export default IconButtons;
