"use client";
import { Checkbox } from "@/components/checkbox";
import { cn } from "@/lib/utils";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { MdRefresh } from "react-icons/md";
import { IoChevronForwardCircle } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";

type PropTypes = {
  category: "all" | "UNREAD" | "CATEGORY_PROMOTIONS" | "CATEGORY_SOCIAL";
  setCategory: Dispatch<
    SetStateAction<"all" | "UNREAD" | "CATEGORY_PROMOTIONS" | "CATEGORY_SOCIAL">
  >;
  sortedCount: number;
};

export const Topbar: FC<PropTypes> = ({
  category,
  setCategory,
  sortedCount,
}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  return (
    <div className="px-6 py-4 h-[56px] justify-between border-b-[1px] border-b-divider flex items-center w-full">
      <div className="flex items-center gap-6 ">
        <div
          className="cursor-pointer"
          onClick={() => setCheckboxChecked(!checkboxChecked)}
        >
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
          All{category === "all" && `(${sortedCount})`}
        </div>
        <div
          onClick={() => setCategory("UNREAD")}
          className={cn(
            "text-creamWhite relative font-semibold flex gap-2 items-center cursor-pointer select-none text-sm",
            {
              'before:content-[""] before:absolute before:w-full before:h-[2px] before:-bottom-2 before:translate-x-[-50%] before:left-[50%] before:bg-blue':
                category === "UNREAD",
            }
          )}
        >
          Unread{category === "UNREAD" && `(${sortedCount})`}
        </div>
        <div
          onClick={() => setCategory("CATEGORY_PROMOTIONS")}
          className={cn(
            "text-creamWhite relative font-semibold flex gap-2 items-center cursor-pointer select-none text-sm",
            {
              'before:content-[""] before:absolute before:w-full before:h-[2px] before:-bottom-2 before:translate-x-[-50%] before:left-[50%] before:bg-blue':
                category === "CATEGORY_PROMOTIONS",
            }
          )}
        >
          Promo{category === "CATEGORY_PROMOTIONS" && `(${sortedCount})`}
        </div>
        <div
          onClick={() => setCategory("CATEGORY_SOCIAL")}
          className={cn(
            "text-creamWhite relative font-semibold flex gap-2 items-center cursor-pointer select-none text-sm",
            {
              'before:content-[""] before:absolute before:w-full before:h-[2px] before:-bottom-2 before:translate-x-[-50%] before:left-[50%] before:bg-blue':
                category === "CATEGORY_SOCIAL",
            }
          )}
        >
          Social{category === "CATEGORY_SOCIAL" && `(${sortedCount})`}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-creamWhite flex items-center gap-2 cursor-pointer px-2 py-1 bg-red rounded-md">
            Delete
            <FaTrash className="w-4 h-4 text-creamWhite" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
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
