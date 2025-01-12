"use client";

import { Input } from "@/components/ui/input";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = encodeURIComponent(search);
    router.push(`/search/?search=${searchTerm}`);
  };

  return (
    <div className="w-52 ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-2"
      >
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 w-96 border-gray-600"
          placeholder="Search Notes...!"
        />
        <button
          type="submit"
          className="py-2 px-2  border-2 rounded-lg w-auto h-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;
