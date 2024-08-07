"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../checkbox";
import { cn } from "@/lib/utils";
import { FaRegStar, FaCircleExclamation, FaTrash } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Link from "next/link";
import { IoMailUnread } from "react-icons/io5";

type PropTypes = {
  checked: boolean;
  unread: boolean;
  starred: boolean;
  hasAttachments: boolean;
};

export const MessagePreview = () => {
  const checked = true;
  const unread = true;
  const starred = true;
  const hasAttachments = true;
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.id !== "message_properies") {
        setIsPropertiesOpen(false);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [isPropertiesOpen]);
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
                <div className="px-4 py-1 text-sm bg-red text-creamWhite font-medium rounded-md">
                  NEW
                </div>
              )}
              <div className="text-sm text-lightGrey max-w-[500px] text-ellipsis overflow-hidden whitespace-nowrap">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
                voluptatum ratione, quisquam qui eius similique voluptas natus
                nesciunt.
              </div>
            </div>
          </Link>
          <div className="flex w-full relative h-full max-w-[180px] justify-end gap-4 items-center">
            {starred && (
              <FaRegStar
                className="w-[16px] h-[16px] cursor-pointer"
                color={"#91919C"}
              />
            )}
            {hasAttachments && (
              <GrAttachment
                className="w-[16px] h-[16px] cursor-pointer"
                color={"#91919C"}
              />
            )}
            <span className="text-lightGrey font-medium select-none">
              11:12PM
            </span>
            <PiDotsThreeVerticalBold
              onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
              className="w-[16px] h-[16px] cursor-pointer"
              color={"#91919C"}
            />
            {isPropertiesOpen && (
              <div
                id="message_properies"
                className="absolute right-[-13px] flex flex-col gap-2 top-[37px] rounded-md bg-grey w-[200px] p-4"
              >
                <span className="text-creamWhite flex gap-2 items-center cursor-pointer select-none">
                  {" "}
                  <IoMailUnread
                    className="w-[16px] h-[16px] cursor-pointer"
                    color={"#79D861"}
                  />
                  Mark as unread
                </span>
                <span className="text-creamWhite flex gap-2 items-center cursor-pointer select-none">
                  <FaCircleExclamation
                    className="w-[16px] h-[16px] cursor-pointer"
                    color={"#FF974A"}
                  />
                  Mark as spam
                </span>
                <span className="text-creamWhite flex gap-2 items-center cursor-pointer select-none">
                  <FaTrash
                    className="w-[16px] h-[16px] cursor-pointer"
                    color={"#FC5A5A"}
                  />
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
