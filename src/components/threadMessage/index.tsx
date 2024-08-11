import { ThreadMessageType } from "@/app/inbox/actions/getMessages";
import React, { FC } from "react";
import { Reply } from "../reply";

type PropTypes = {
  msg: ThreadMessageType;
  thread: ThreadMessageType[];
};

export const ThreadMessage: FC<PropTypes> = ({ msg, thread }) => {
  return (
    <div className="self-start w-full mt-4 text-creamWhite" key={msg.id}>
      <div className="self-start font-medium text-xl text-creamWhite">
        <span className="text-orange">From:</span>{" "}
        {`${
          msg?.payload.headers
            .find((header) => header.name === "From")
            ?.value.split("<")[0]
        }`}{" "}
        <span className="text-sm text-lightGrey">{`<${
          msg?.payload.headers
            .find((header) => header.name === "From")
            ?.value.split("<")[1]
        }`}</span>
      </div>
      <div className="self-start mt-6 font-medium text-creamWhite">
        <span className="text-green">To:</span>{" "}
        {`${
          msg?.payload.headers.find((header) => header.name === "To")?.value
        }`}
      </div>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: msg.decodedValue }}
      ></div>
      <Reply
        threadId={msg.threadId}
        messageId={msg.id}
        to={`${
          msg.payload.headers.find((header) => header.name === "From")?.value
        }`}
      />
      {thread.length % 2 === 0 && (
        <div className="my-6 w-full h-[1px] bg-divider"></div>
      )}
    </div>
  );
};
