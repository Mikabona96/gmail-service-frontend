import { MessageView } from "@/components/messageView";
import React from "react";

const MessageIdInbox = ({ params }: { params: { messageId: string } }) => {
  return (
    <div className="p-6 grow flex">
      <MessageView id={params.messageId} />
    </div>
  );
};

export default MessageIdInbox;
