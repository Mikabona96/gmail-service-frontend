"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/tools/utils/cn";
import { FaChevronDown } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.id !== "account_menu") {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, [isOpen]);

  const googlesignInHandler = () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + "/auth";
  };

  const logoutHandler = async () => {
    setUser(null);
    window.location.href = process.env.NEXT_PUBLIC_API_URL + "/auth/logout";
  };

  return (
    <nav className="bg-black h-14 flex items-center w-full px-3 border-b-divider border-b-[1px]">
      <div className="LOGO text-[#fff] w-[238px]">
        <Link
          href={`${process.env.NEXT_PUBLIC_CLIENT_URL}`}
          className="font-bold text-creamWhite"
        >
          MAIL SERVICE
        </Link>
      </div>
      <ul className="flex justify-between items-center flex-grow">
        <li></li>
        {user ? (
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

              <span className="text-creamWhite">{`${user.firstName} ${user.lastName}`}</span>
              <Image
                width={40}
                height={40}
                className="rounded-full w-[40px] h-[40px]"
                src={`${user.picture}`}
                alt="profile_img"
              />
            </div>
            <div
              id="account_menu"
              className={cn(
                "absolute z-50 -bottom-16 left-0 hidden p-4 w-full bg-grey rounded-md",
                {
                  block: isOpen,
                }
              )}
            >
              <span
                onClick={logoutHandler}
                className="text-creamWhite p-2 cursor-pointer select-none"
              >
                Logout
              </span>
            </div>
          </li>
        ) : (
          <button
            className="text-creamWhite flex gap-4 items-center"
            onClick={googlesignInHandler}
          >
            <FaGoogle height={"24px"} width={"24px"} color="#91919C" />
            Sign in with Google
          </button>
        )}
      </ul>
    </nav>
  );
}
