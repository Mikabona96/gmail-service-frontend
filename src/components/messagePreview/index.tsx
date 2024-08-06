"use client";
import React from "react";
import { Checkbox } from "../checkbox";
import { cn } from "@/lib/utils";
import { FaRegStar } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Link from "next/link";

export const MessagePreview = () => {
  const checked = true;
  const unread = true;
  return (
    <div className="p-6">
      <div
        className={cn("flex w-full items-center gap-6 px-6 py-2", {
          "bg-grey rounded-md": unread,
        })}
      >
        <span className="p-2 cursor-pointer">
          <Checkbox checked={checked} />
        </span>
        <div className="flex items-center w-full justify-between">
          <Link href={"#"} className="flex grow gap-12 pr-6">
            <div className="flex items-center max-w-[320px] w-full justify-between">
              <span className="text-creamWhite font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                Name of Sender
              </span>
              <span className="text-creamWhite text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                Subject of message
              </span>
            </div>
            <div className="flex w-full max-w-[600px] justify-between items-center">
              {unread && (
                <div className="px-4 py-1 text-sm bg-red text-creamWhite font-semibold rounded-md">
                  NEW
                </div>
              )}
              <div className="text-xs text-lightGrey max-w-[500px] text-ellipsis overflow-hidden whitespace-nowrap">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
                voluptatum ratione, quisquam qui eius similique voluptas natus
                nesciunt.
              </div>
            </div>
          </Link>
          <div className="flex w-full h-full max-w-[180px] justify-between items-center">
            <FaRegStar
              className="w-[16px] h-[16px] cursor-pointer"
              color={"#91919C"}
            />
            <GrAttachment
              className="w-[16px] h-[16px] cursor-pointer"
              color={"#91919C"}
            />
            <span className="text-lightGrey font-medium">11:12PM</span>
            <PiDotsThreeVerticalBold
              className="w-[16px] h-[16px] cursor-pointer"
              color={"#91919C"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
