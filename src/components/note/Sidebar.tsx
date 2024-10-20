import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdOutlineLabel } from "react-icons/md";
import { IoArchiveSharp } from "react-icons/io5";
import { ImBin2 } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  const sidebarItems = [
    { title: "Note", icon: <FaRegNoteSticky size={25} /> },
    { title: "Labels", icon: <MdOutlineLabel size={25} /> },
    { title: "Archives", icon: <IoArchiveSharp size={25} /> },
    { title: "Bin", icon: <ImBin2 size={25} /> },
  ];

  return (
    <div className="realtive">
      <Sheet>
        <SheetTrigger>
          <GiHamburgerMenu size={25} />
        </SheetTrigger>
        <SheetContent side="left" className="w-56 text-black/40">
          <SheetTitle>
            <h2 className="text-xl ">MemoMind</h2>
            <Separator className="py-0.5 bg-black" />
          </SheetTitle>
          <SheetHeader>
            <SheetDescription>
              <ul>
                {sidebarItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-start gap-2 text-xl p-2 py-2 rounded-full hover:bg-yellow-400 cursor-pointer w-40 my-2"
                  >
                    <p className="">{item.icon}</p>
                    <p>{item.title}</p>
                  </li>
                ))}
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
