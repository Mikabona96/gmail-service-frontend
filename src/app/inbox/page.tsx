import React from "react";
import { Topbar } from "./elements/topbar";
import { MessagePreview } from "@/components/messagePreview";

const Inbox = () => {
  return (
    <div className="flex flex-col flex-grow">
      <Topbar />
      <MessagePreview />
    </div>
  );
};

export default Inbox;
