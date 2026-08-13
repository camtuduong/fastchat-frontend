interface Message {
  messages: MessageItem[];
  nextCursor: string | null;
}

interface MessageItem {
  _id: string;
  sender: Sender;
  content: string;
  conversationId: string;
  system:
    | {
        action: ActionType;
      }
    | null
    | undefined;
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
export type {
  Message,
  MessageItem,
  Attachment,
  Sender,
  ActionType,
  Emoji,
  AttachmentType,
};
