"use client";
import {
  getMessage,
  getThreadMessages,
  MessageType,
  ThreadMessageType,
} from "@/app/inbox/actions/getMessages";
import React, { FC, useEffect, useState } from "react";
import { ThreadMessage } from "../threadMessage";
import { Reply } from "../reply";

type PropTypes = {
  id: string;
};

export const MessageView: FC<PropTypes> = ({ id }) => {
  const [message, setMessage] = useState<MessageType | null>(null);
  const [thread, setThread] = useState<ThreadMessageType[] | null>(null);

  useEffect(() => {
    getMessage(id).then((msg) => setMessage(msg));
  }, []);

  useEffect(() => {
    if (message) {
      getThreadMessages(message?.threadId).then((msgs) => setThread(msgs));
    }
  }, [message]);

  console.log(message);
  console.log(JSON.stringify(thread));

  if (!message) {
    return (
      <div className="text-3xl text-creamWhite font-semibold">
        Loading data...
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col grow pl-12 pr-12">
      <div className="self-start">Control Panel</div>
      <div className="flex self-start items-center w-full flex-col">
        <div className="self-start mt-4 font-medium text-xl text-creamWhite">
          <span className="text-orange">From:</span>{" "}
          {` ${message?.headers.From.split("<")[0]}`}{" "}
          <span className="text-sm text-lightGrey">{`<${
            message?.headers?.From.split("<")[1]
          }`}</span>
        </div>
        <div className="self-start mt-6 font-medium text-creamWhite">
          <span className="text-green">To:</span> {`${message.headers.To}`}
        </div>
        <div className="self-start mt-4 font-medium text-creamWhite">
          {`${message?.snippet}`}
        </div>
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
              const type =
                filteredHeaders && filteredHeaders.value.split("/")[0];
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
        <Reply
          setThread={setThread}
          threadId={message.threadId}
          messageId={message.id}
          to={message.headers.From}
        />
        <div className="my-6 w-full h-[1px] bg-divider"></div>
      </div>
      {thread &&
        thread.map((msg) => (
          <ThreadMessage
            setThread={setThread}
            key={msg.id}
            msg={msg}
            thread={thread}
          />
        ))}
    </div>
  );
};
