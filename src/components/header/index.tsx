"use client";
import React, { useState } from "react";
import { cn } from "@/tools/utils/cn";
import { FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-black h-14 flex items-center w-full px-3 border-b-divider border-b-[1px]">
      <div className="LOGO text-[#fff] w-[238px]">
        <span className="font-bold text-creamWhite">MAIL SERVICE</span>
      </div>
      <ul className="flex justify-between items-center flex-grow">
        <li></li>
        <li className="relative">
          <div
            className="flex items-center gap-4 cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaChevronDown
              className={cn("rotate-0 transition-all", {
                "-rotate-180": isOpen,
              })}
              height={"24px"}
              width={"24px"}
              color="#91919C"
            />

            <span className="text-creamWhite">Your Fullname</span>
            <div className="rounded-full w-[40px] h-[40px] bg-[#df2626]">
              sds
            </div>
          </div>
          <div
            className={cn(
              "absolute z-50 -bottom-16 left-0 hidden p-4 w-full bg-grey rounded-md",
              {
                block: isOpen,
              }
            )}
          >
            <span className="text-creamWhite p-2 cursor-pointer select-none">
              Logout
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
