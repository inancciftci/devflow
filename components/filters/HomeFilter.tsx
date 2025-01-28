"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const filters = [
  { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },
  //   { name: "Newest", value: "newest" },
  //   { name: "Popular", value: "popular" },
  //   { name: "Unanswered", value: "unanswered" },
  //   { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");
  const handleTypeClick = (filter: string) => {
    if (filter === active) {
      setActive("");
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(filter);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter,
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          onClick={() => handleTypeClick(filter.value)}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none `,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-primary-100 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          key={filter.name}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
