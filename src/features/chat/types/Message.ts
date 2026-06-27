interface Message {
  messages: MessageItem[];
  nextCursor: string | null;
}

interface MessageItem {
  _id: string;
  sender: Sender;
  content: string;
  attachments: Attachment[] | [];
  createdAt: Date;
  updatedAt: Date;
}

interface Sender {
  userId: string;
  username: string;
}

interface Attachment {
  id: string;
  type: "image" | "video" | "file";
  url: string;
  name: string;
  size: number;
}

export type { Message, MessageItem, Attachment };
