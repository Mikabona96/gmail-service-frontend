type Response = {
  nextPageToken: string;
  messages: MessageType[];
};

export type MessageType = {
  attachments: any[];
  headers: {
    Subject: string;
    To: string;
    From: string;
    Date: string;
  };
  historyId: string;
  htmlPage: string;
  id: string;
  internalDate: string;
  labelIds: string[];
  sizeEstimate: number;
  snippet: string;
  threadId: string;
};

export const getMessages = async (): Promise<Response> => {
  const messages = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/messages/list`,
    {
      credentials: "include",
    }
  );
  return await messages.json();
};
