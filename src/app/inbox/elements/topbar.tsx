"use client";
import { Checkbox } from "@/components/checkbox";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { IoChevronForwardCircle } from "react-icons/io5";

export const Topbar = () => {
  const categories = ["all", "unread", "promo", "social"];
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [category, setCategory] = useState("unread");
  return (
    <div className="px-6 py-4 h-[56px] justify-between border-b-[1px] border-b-divider flex items-center w-full">
      <div className="flex items-center gap-6 ">
        <div onClick={() => setCheckboxChecked(!checkboxChecked)}>
          <Checkbox checked={checkboxChecked} />
        </div>
        <div
          onClick={() => setCategory("all")}
          className={cn(
            "text-creamWhite relative font-semibold cursor-pointer select-none text-sm",
            {
              'before:content-[""] before:absolute before:w-full before:h-[2px] before:-bottom-2 before:translate-x-[-50%] before:left-[50%] before:bg-blue':
                category === "all",
            }
          )}
        >
          All(111)
        </div>
        <div
          onClick={() => setCategory("unread")}
          className={cn(
            "text-creamWhite relative font-semibold flex gap-2 items-center cursor-pointer select-none text-sm",
            {
              'before:content-[""] before:absolute before:w-full before:h-[2px] before:-bottom-2 before:translate-x-[-50%] before:left-[50%] before:bg-blue':
                category === "unread",
            }
          )}
        >
          Unread(111)
        </div>
        <div
          onClick={() => setCategory("promo")}
          className={cn(
            "text-creamWhite relative font-semibold flex gap-2 items-center cursor-pointer select-none text-sm",
            {
              'before:content-[""] before:absolute before:w-full before:h-[2px] before:-bottom-2 before:translate-x-[-50%] before:left-[50%] before:bg-blue':
                category === "promo",
            }
          )}
        >
          Promo(111)
        </div>
        <div
          onClick={() => setCategory("social")}
          className={cn(
            "text-creamWhite relative font-semibold flex gap-2 items-center cursor-pointer select-none text-sm",
            {
              'before:content-[""] before:absolute before:w-full before:h-[2px] before:-bottom-2 before:translate-x-[-50%] before:left-[50%] before:bg-blue':
                category === "social",
            }
          )}
        >
          Social(111)
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <MdRefresh
          width={"24px"}
          height={"24px"}
          className="h-6 w-6"
          color="#91919C"
        />
        <span className="rotate-180 cursor-pointer m-0 before:w-[16px] before:h-[16px] flex items-center justify-center p-0 before:content-[''] before:absolute relative before:top-[4px] before:left-[3px] before:rounded-full before:bg-creamWhite">
          <IoChevronForwardCircle
            width={"24px"}
            height={"24px"}
            className="h-6 w-6 relative z-10"
            color="#4D4D55"
          />
        </span>
        <span className="m-0 cursor-pointer before:w-[16px] before:h-[16px] flex items-center justify-center p-0 before:content-[''] before:absolute relative before:top-[4px] before:left-[3px] before:rounded-full before:bg-creamWhite">
          <IoChevronForwardCircle
            width={"24px"}
            height={"24px"}
            className="h-6 w-6 relative z-10"
            color="#4D4D55"
          />
        </span>
        <span className="text-creamWhite font-semibold text-sm">Page: 1</span>
      </div>
    </div>
  );
};
