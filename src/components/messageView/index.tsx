"use client";
import { getMessage, MessageType } from "@/app/inbox/actions/getMessages";
import React, { FC, useEffect, useState } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";

type PropTypes = {
  id: string;
};

export const MessageView: FC<PropTypes> = ({ id }) => {
  const [message, setMessage] = useState<MessageType | null>(null);
  const [isReply, setIsReply] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    getMessage(id).then((msg) => setMessage(msg));
  }, []);

  console.log(message);

  if (!message) {
    return (
      <div className="text-3xl text-creamWhite font-semibold">
        Loading data...
      </div>
    );
  }

  const sendReplyHandler = (data: {
    messageId: string;
    subject: string;
    text: string;
    to: string;
    threadId: string;
  }) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/message/reply`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="flex items-center flex-col grow pl-12 pr-12">
      <div className="self-start">Control Panel</div>
      <div className="self-start mt-4 font-medium text-xl text-creamWhite">
        {`${message?.headers.From.split("<")[0]}`}{" "}
        <span className="text-sm text-lightGrey">{`<${
          message?.headers?.From.split("<")[1]
        }`}</span>
      </div>
      <div className="self-start mt-6 font-medium text-creamWhite">
        {`${message.headers.To}`}
      </div>
      <div className="self-start mt-4 font-medium text-creamWhite">
        {`${message?.snippet}`}
      </div>
      <div className="my-6 w-full h-[1px] bg-divider"></div>
      {message.attachments.length > 0 && (
        <span className="text-md self-start text-creamWhite font-medium mb-4">
          Attached files: {message.attachments.length}
        </span>
      )}
      <div className="self-start">
        {message.attachments &&
          message.attachments.map((att, idx) => {
            const filteredHeaders = att.headers.filter(
              (h: any) => h.name === "Content-Type"
            )[0];
            const type = filteredHeaders && filteredHeaders.value.split("/")[0];
            if (type === "image") {
              return (
                <div key={idx}>
                  <img
                    src={`data:image/jpeg;base64,${att.attachment}`}
                    className="w-[180px] h-[120px]"
                    alt={`${att.filename}`}
                  />
                </div>
              );
            } else {
              return <div key={idx}>Ooopsss...</div>;
            }
          })}
      </div>

      {message?.htmlPage && (
        <div
          className="max-w-[80%]"
          dangerouslySetInnerHTML={{ __html: message.htmlPage }}
        ></div>
      )}
      {!isReply ? (
        <div
          onClick={() => setIsReply(!isReply)}
          className="self-start mt-12 rounded-3xl bg-grey transition hover:bg-blue flex gap-2 items-center text-creamWhite px-6 py-2 cursor-pointer"
        >
          <BsFillReplyFill width={24} hanging={24} />
          Reply
        </div>
      ) : (
        <div className="w-full px-4 py-2 bg-grey rounded-2xl mt-12">
          <div className="flex items-center text-lg gap-4 text-creamWhite">
            <BsFillReplyFill width={24} hanging={24} />
            <div>
              {`${message?.headers.From.split("<")[0]}`}{" "}
              <span className="text-sm text-lightGrey">{`<${
                message?.headers?.From.split("<")[1]
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
                  const to = message.headers.To.split("<")[1].slice(
                    0,
                    message.headers.To.split("<")[1].length - 1
                  );
                  sendReplyHandler({
                    messageId: message.id,
                    threadId: message.threadId,
                    subject: message.headers.Subject,
                    text,
                    to,
                  });
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
    </div>
  );
};
