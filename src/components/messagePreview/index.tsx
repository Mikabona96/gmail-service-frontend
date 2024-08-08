"use client";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Checkbox } from "../checkbox";
import { cn } from "@/lib/utils";
import { FaRegStar, FaCircleExclamation, FaTrash } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Link from "next/link";
import { IoMailUnread } from "react-icons/io5";
import { MessageType } from "@/app/inbox/actions/getMessages";

type PropTypes = {
  id: string;
  checked?: boolean;
  unread: boolean;
  starred?: boolean;
  hasAttachments?: boolean;
  snippet: string;
  subject: string;
  from: string;
  messages: MessageType[] | null;
  setMessages: Dispatch<SetStateAction<MessageType[] | null>>;
};

export const MessagePreview: FC<PropTypes> = ({
  id,
  unread,
  snippet,
  subject,
  from,
  starred,
  hasAttachments,
  messages,
  setMessages,
}) => {
  const checked = true;
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

  const toTrashMessage = (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/to-trash?id=${id}`, {
      credentials: "include",
    });

    setMessages((prev) => {
      if (prev) {
        const filtered = prev.filter((message) => message.id !== id);
        return filtered;
      }
      return null;
    });
  };
  const toSpamMessage = (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/to-spam?id=${id}`, {
      credentials: "include",
    });

    setMessages((prev) => {
      if (prev) {
        const filtered = prev.filter((message) => message.id !== id);
        return filtered;
      }
      return null;
    });
  };
  const markUnread = (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/to-unread?id=${id}`, {
      credentials: "include",
    });

    setMessages((prev) => {
      if (prev) {
        const filtered = prev.map((message) => {
          if (message.id === id) {
            message.labelIds.push("UNREAD");
          }
          return message;
        });
        return filtered;
      }
      return null;
    });
  };
  return (
    <div className="">
      <div
        className={cn("flex w-full items-center gap-6 px-6 py-2", {
          "bg-grey rounded-md": unread,
        })}
      >
        <span className="p-2 cursor-pointer">
          <Checkbox checked={checked} />
        </span>
        <div className="flex items-center w-full">
          <Link href={`/inbox/${id}`} className="flex grow gap-12 pr-6">
            <div className="flex items-center gap-3 w-full">
              <span className="text-creamWhite font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                {from}
              </span>
              <span className="text-creamWhite w-[200px] text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                {subject.trim()}
              </span>
            </div>
            <div className="flex w-full max-w-[600px] gap-6 items-center">
              {unread && (
                <div className="px-4 py-1 text-sm bg-red text-creamWhite font-medium rounded-md">
                  NEW
                </div>
              )}
              <div
                className={cn(
                  "text-sm text-lightGrey max-w-[280px] overflow-hidden whitespace-nowrap"
                )}
              >
                {`${snippet}`.length > 32
                  ? snippet.slice(0, 32) + "..."
                  : snippet}
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
                className="absolute z-30 right-[-13px] flex flex-col gap-2 top-[37px] rounded-md bg-grey w-[200px] p-4"
              >
                <span
                  onClick={() => markUnread(id)}
                  className="text-creamWhite flex gap-2 items-center cursor-pointer select-none"
                >
                  {" "}
                  <IoMailUnread
                    className="w-[16px] h-[16px] cursor-pointer"
                    color={"#79D861"}
                  />
                  Mark as unread
                </span>
                <span
                  onClick={() => toSpamMessage(id)}
                  className="text-creamWhite flex gap-2 items-center cursor-pointer select-none"
                >
                  <FaCircleExclamation
                    className="w-[16px] h-[16px] cursor-pointer"
                    color={"#FF974A"}
                  />
                  Mark as spam
                </span>
                <span
                  onClick={() => toTrashMessage(id)}
                  className="text-creamWhite flex gap-2 items-center cursor-pointer select-none"
                >
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
