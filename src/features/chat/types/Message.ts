interface Message {
  messages: MessageItem[];
  nextCursor: string | null;
}

interface MessageItem {
  _id: string;
  sender: Sender;
  content: string;
  attachments: Attachment[] | [];
  replyTo: MessageItem | null | undefined;
  createdAt: string;
  updatedAt: string;
}

interface Sender {
  userId: string;
  displayName: string;
  avatarUrl: string;
}

interface Attachment {
  id: string;
  type: "image" | "video" | "file";
  url: string;
  name: string;
}

export interface Emoji {
  id: string;
  name: string;
  emoticons: string[];
  shortcodes: string;
  keywords: string[];
  unified: string;
  native: string;
}
export type { Message, MessageItem, Attachment };
