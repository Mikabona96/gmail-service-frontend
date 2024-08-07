"use client";
import { cn } from "@/tools/utils/cn";
import {
  FaInbox,
  FaFile,
  FaRegStar,
  FaRegPaperPlane,
  FaTrash,
  FaCircleExclamation,
  FaPerson,
} from "react-icons/fa6";
import { BsShieldFillExclamation } from "react-icons/bs";
import { IoMailUnread, IoCreateOutline } from "react-icons/io5";
import {
  MdGroups,
  MdSystemSecurityUpdateWarning,
  MdForum,
} from "react-icons/md";
import { FaMoneyCheck, FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export const Sidebar = () => {
  const pathname = usePathname();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const categories = [
    {
      category: "INBOX",
      name: "Inbox",
      Icon: FaInbox,
    },
    {
      category: "DRAFT",
      name: "Draft",
      Icon: FaFile,
    },
    {
      category: "STARRED",
      name: "Starred",
      Icon: FaRegStar,
    },
    {
      category: "SENT",
      name: "Sent",
      Icon: FaRegPaperPlane,
    },
    {
      category: "TRASH",
      name: "Trash",
      Icon: FaTrash,
    },
    {
      category: "SPAM",
      Icon: BsShieldFillExclamation,
      name: "Spam",
    },
    {
      category: "UNREAD",
      name: "Unread",
      Icon: IoMailUnread,
    },
    {
      category: "IMPORTANT",
      name: "Important",
      Icon: FaCircleExclamation,
    },
  ];

  const categories2 = [
    {
      category: "CATEGORY_PERSONAL",
      name: "Personal",
      Icon: FaPerson,
    },
    {
      category: "CATEGORY_SOCIAL",
      name: "Social",
      Icon: MdGroups,
    },
    {
      category: "CATEGORY_PROMOTIONS",
      name: "Promotions",
      Icon: FaMoneyCheck,
    },
    {
      category: "CATEGORY_UPDATES",
      name: "Updates",
      Icon: MdSystemSecurityUpdateWarning,
    },
    {
      category: "CATEGORY_FORUMS",
      name: "Forums",
      Icon: MdForum,
    },
  ];

  return (
    <aside className="pt-8 pb-12 h-full w-[250px] flex flex-col">
      <div className="w-full px-3 flex items-center justify-center text-[#fff]">
        <div className="bg-grey w-full rounded-md flex items-center gap-2 py-2 px-4 text-creamWhite font-semibold">
          <IoCreateOutline
            width={"24px"}
            height={"24px"}
            className="h-6 w-6 mb-1"
            color="#91919C"
          />{" "}
          New Message
        </div>
      </div>
      <nav className="flex mt-8 flex-col">
        {categories.map(({ Icon, category, name }, idx) => {
          return (
            <Link
              href={`/${category.toLowerCase()}`}
              key={idx}
              className={cn(
                "flex items-center py-[6px] pl-6 gap-4 relative cursor-pointer",
                {
                  "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-lg before:bg-creamWhite":
                    pathname.slice(1) === category.toLowerCase(),
                }
              )}
            >
              <Icon
                width={"24px"}
                height={"24px"}
                color={
                  pathname.slice(1) === category.toLowerCase()
                    ? "#FAFAFB"
                    : "#91919C"
                }
              />
              <span
                className={cn("text-lightGrey font-medium", {
                  "text-creamWhite":
                    pathname.slice(1) === category.toLowerCase(),
                })}
              >
                {name}
              </span>
            </Link>
          );
        })}
        <div className="w-full my-6 px-4">
          <div className="h-[1px] bg-divider"></div>
        </div>
        <div
          className="flex flex-col px-4"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div className="flex items-center justify-between mb-4 cursor-pointer select-none">
            <span className="text-lightGrey font-semibold text-sm">
              MESSAGE CATEGORIES
            </span>
            <FaChevronDown
              className={cn("rotate-0 transition-all", {
                "-rotate-180": isAccordionOpen,
              })}
              height={"24px"}
              width={"24px"}
              color="#91919C"
            />
          </div>
          {isAccordionOpen &&
            categories2.map(({ Icon, category, name }, idx) => {
              return (
                <Link
                  href={`/${category.toLowerCase()}`}
                  key={idx}
                  className={cn(
                    "flex items-center py-[6px] pl-6 gap-4 relative cursor-pointer",
                    {
                      "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-lg before:bg-creamWhite":
                        pathname.slice(1) === category.toLowerCase(),
                    }
                  )}
                >
                  <Icon
                    width={"24px"}
                    height={"24px"}
                    color={
                      pathname.slice(1) === category.toLowerCase()
                        ? "#FAFAFB"
                        : "#91919C"
                    }
                  />
                  <span
                    className={cn("text-lightGrey font-medium", {
                      "text-creamWhite":
                        pathname.slice(1) === category.toLowerCase(),
                    })}
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
        </div>
      </nav>
    </aside>
  );
};
