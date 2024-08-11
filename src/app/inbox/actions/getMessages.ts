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
    "Message-ID": string;
    References?: string;
    "In-Reply-To"?: string;
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
export const getMessage = async (id: string): Promise<MessageType> => {
  const messages = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/messages/${id}`,
    {
      credentials: "include",
    }
  );
  return await messages.json();
};
export const getAttachments = async (
  id: string,
  attachmentId: string
): Promise<string> => {
  const messages = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/messages/attachment/${id}?id=${attachmentId}`,
    {
      credentials: "include",
    }
  );
  return await messages.json();
};

export const getCategoryMessages = async (
  category: string
): Promise<Response> => {
  const messages = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/messages/list?category=${category}`,
    {
      credentials: "include",
    }
  );
  return await messages.json();
};
