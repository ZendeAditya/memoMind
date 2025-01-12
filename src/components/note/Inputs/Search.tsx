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
        <button type="submit" className="py-2 px-2  border-2 rounded-lg w-10 md:w-40 lg:w-52">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
