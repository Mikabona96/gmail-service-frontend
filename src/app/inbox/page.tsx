"use client";
import { useEffect, useState } from "react";
import { getMessages, MessageType } from "./actions/getMessages";
import { Topbar } from "./elements/topbar";
import { MessagePreview } from "@/components/messagePreview";

const Inbox = () => {
  const [messages, setMessages] = useState<MessageType[] | null>(null);
  const [category, setCategory] = useState<
    "all" | "UNREAD" | "CATEGORY_PROMOTIONS" | "CATEGORY_SOCIAL"
  >("all");

  useEffect(() => {
    getMessages().then((msgs) => {
      const filtered = msgs.messages.filter((msg) => !msg.headers.References);
      setMessages(filtered);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!messages) {
    return (
      <div className="text-creamWhite font-semibold text-2xl">No messages</div>
    );
  }

  const sortHandler = () => {
    if (category === "all") return messages;
    const sorted = messages.filter((msg) => msg.labelIds.includes(category));
    return sorted;
  };

  return (
    <div className="flex flex-col flex-grow">
      <Topbar
        sortedCount={sortHandler().length || 0}
        category={category}
        setCategory={setCategory}
      />
      <div className="p-6 flex flex-col gap-2">
        {messages &&
          sortHandler().map((message) => {
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
