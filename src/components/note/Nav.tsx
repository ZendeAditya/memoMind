import Profile from "@/components/auth/Profile";
import Sidebar from "./Sidebar";
import Search from "./Inputs/Search";
import Link from "next/link";
import Image from "next/image";
import memomindlogo from "../../../assets/memomind_logo.png";
import Image from "next/image";
const Nav = () => {
  return (
    <nav className="flex items-center justify-between border-b-2 py-2 shadow-md px-2 sticky top-0">
      <div className="flex items-center justify-between">
        <div>
          <Sidebar />
        </div>
        <div>
          <Link href="/">
            <h2 className="text-xl md:text-3xl lg:text-5xl px-2 py-2">
              <Image
                src={memomindlogo}
                alt="Logo"
                className="w-10 h-10 cursor-pointer"
              />
            </h2>
          </Link>
        </div>
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Profile />
      </div>
    </nav>
  );
};

export default Nav;
