import type { JSONContent } from "@tiptap/react";

interface Message {
  messages: MessageItem[];
  nextCursor: string | null;
}

interface MessageItem {
  _id: string;
  sender: Sender;
  content: string;
  contentJson?: JSONContent;
  mentionedUserIds?: string[];
  conversationId: string;
  system:
    | {
        action: ActionType;
      }
    | null
    | undefined;
  attachments: Attachment[] | [];
  threadId: string | null;
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
  type: AttachmentType;
  url: string;
  name: string;
}

type AttachmentType = "image" | "video" | "file" | "sticker";

type ActionType =
  | "create_group"
  | "rename_group"
  | "change_group_avatar"
  | "add_member"
  | "share_conversation"
  | "remove_member"
  | "leave_group"
  | "pin_message"
  | "unpin_message";

interface Emoji {
  id: string;
  name: string;
  emoticons: string[];
  shortcodes: string;
  keywords: string[];
  unified: string;
  native: string;
}

type MessageProps = {
  conversationId: string;
  receiverId?: string;
  content?: string;
  attachments?: Attachment[];
  replyTo?: string;
  contentJson?: JSONContent;
};

export type {
  Message,
  MessageItem,
  Attachment,
  Sender,
  ActionType,
  Emoji,
  AttachmentType,
  MessageProps,
};
