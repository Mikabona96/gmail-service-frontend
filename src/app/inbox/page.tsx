"use client";
import { useEffect, useState } from "react";
import { getMessages, MessageType } from "./actions/getMessages";
import { Topbar } from "./elements/topbar";
import { MessagePreview } from "@/components/messagePreview";

const Inbox = () => {
  const [messages, setMessages] = useState<MessageType[] | null>(null);

  useEffect(() => {
    getMessages().then((msgs) => setMessages(msgs.messages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!messages) {
    return (
      <div className="text-creamWhite font-semibold text-2xl">No messages</div>
    );
  }

  return (
    <div className="flex flex-col flex-grow">
      <Topbar />
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
              />
            );
          })}
      </div>
    </div>
  );
};

export default Inbox;
