"use client";
import { useEffect, useState } from "react";
import { MessagePreview } from "@/components/messagePreview";
import { getCategoryMessages, MessageType } from "../inbox/actions/getMessages";

const Trash = () => {
  const [messages, setMessages] = useState<MessageType[] | null>(null);
  const [checkedMsgs, setCheckedMsgs] = useState<string[]>([]);

  useEffect(() => {
    getCategoryMessages("trash").then((msgs) => setMessages(msgs.messages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <div className="p-6 flex flex-col gap-2">
        {messages &&
          messages.map((message) => {
            const unread =
              message.labelIds &&
              message.labelIds.filter((label) => label === "UNREAD");
            const starred =
              message.labelIds &&
              message.labelIds.filter((label) => label === "STARRED");
            // console.log(unread && unread[0] === "UNREAD");
            return (
              <MessagePreview
                checked={!!checkedMsgs.find((msg) => msg === message.id)}
                messages={messages}
                setMessages={setMessages}
                id={message.id}
                from={`${message.headers.From}`.split("<")[0].trim()}
                subject={`${message.headers.Subject}`}
                hasAttachments={message.attachments.length > 0}
                snippet={`${message.snippet}`.trim()}
                starred={starred && starred[0] === "STARRED"}
                unread={unread && unread[0] === "UNREAD"}
                key={message.id}
                setCheckedMsgs={setCheckedMsgs}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Trash;
