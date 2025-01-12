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
import { Button } from "../ui/button";
import Link from "next/link";
interface SidebarItem {
  title: string;
  icon: JSX.Element;
  link: string;
}
const Sidebar = () => {
  const sidebarItems: SidebarItem[] = [
    { title: "Note", icon: <FaRegNoteSticky size={25} />, link: "/note" },
    { title: "Labels", icon: <MdOutlineLabel size={25} />, link: "/labels" },
    {
      title: "Archives",
      icon: <IoArchiveSharp size={25} />,
      link: "/archives",
    },
    { title: "Bin", icon: <ImBin2 size={25} />, link: "/bin" },
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
              <ul className="flex flex-col gap-2 py-3">
                {sidebarItems.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <Button className="w-full flex items-center justify-start gap-4">
                      <li className="flex items-center justify-center gap-3 py-2">
                        <p className="">{item.icon}</p>
                        <p>{item.title}</p>
                      </li>
                    </Button>
                  </Link>
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
