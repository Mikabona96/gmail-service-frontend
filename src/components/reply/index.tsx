import {
  getThreadMessages,
  ThreadMessageType,
} from "@/app/inbox/actions/getMessages";
import React, { FC, useState } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";

type PropTypes = {
  to: string;
  messageId: string;
  threadId: string;
  setThread: React.Dispatch<React.SetStateAction<ThreadMessageType[] | null>>;
};

export const Reply: FC<PropTypes> = ({
  to,
  messageId,
  setThread,
  threadId,
}) => {
  const [isReply, setIsReply] = useState(false);
  const [text, setText] = useState("");

  const sendReplyHandler = (data: { messageId: string; text: string }) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/message/reply`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => {
      if (data.status === 201) {
        getThreadMessages(threadId).then((msgs) => setThread(msgs));
      }
    });
  };

  return (
    <>
      {!isReply ? (
        <div
          onClick={() => setIsReply(!isReply)}
          className="self-start w-fit mt-6 rounded-3xl bg-grey transition hover:bg-blue flex gap-2 items-center text-creamWhite px-6 py-2 cursor-pointer"
        >
          <BsFillReplyFill width={24} hanging={24} />
          Reply
        </div>
      ) : (
        <div className="w-full px-4 py-2 bg-grey rounded-2xl mt-6">
          <div className="flex items-center text-lg gap-4 text-creamWhite">
            <BsFillReplyFill width={24} hanging={24} />
            <div>
              {`${to.split("<")[0]}`}{" "}
              <span className="text-sm text-lightGrey">{`<${
                to.split("<")[1]
              }`}</span>
            </div>
          </div>
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-32 pt-4 bg-[inherit] border-none resize-none outline-none text-creamWhite "
            name="reply"
            id="reply-text"
          ></textarea>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                onClick={() => {
                  sendReplyHandler({ messageId, text });
                  setIsReply(!isReply);
                }}
                className="w-fit mt-1 rounded-3xl bg-blue flex gap-2 items-center text-creamWhite px-6 py-2 cursor-pointer"
              >
                Send
              </div>
            </div>
            <FaTrash
              onClick={() => setIsReply(!isReply)}
              className="text-red cursor-pointer"
              width={24}
              height={24}
            />
          </div>
        </div>
      )}
    </>
  );
};
