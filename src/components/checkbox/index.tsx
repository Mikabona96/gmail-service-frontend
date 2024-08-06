import { cn } from "@/lib/utils";
import React, { FC } from "react";

type PropsType = {
  checked: boolean;
};

export const Checkbox: FC<PropsType> = ({ checked }) => {
  return (
    <div
      className={cn(
        "flex w-3 rounded-sm relative border-lightGrey border h-3 ",
        {
          "before:content-[''] before:w-[1px] before:top-[3px] before:-rotate-[42deg] before:left-[3px] after:content-[''] after:w-[1px] after:top-[1px] after:rotate-[30deg] after:right-[3px] after:h-[7px] after:bg-creamWhite after:rounded-sm after:absolute before:h-[5px] before:bg-creamWhite before:rounded-sm before:absolute":
            checked,
        }
      )}
    ></div>
  );
};
