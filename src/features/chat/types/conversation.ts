interface Conversation {
  _id: string;
  participants: Participant[];
  __v: number;
  lastMessage: LastMessage;
  seenBy: string[];
  type: ConversationType;
  unreadCount: {
    [userId: string]: number;
  };
  group: Group;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  pinnedMessages: PinnedMessage[];
  favoriteBy: string[];
  isFavorite: boolean;
}
interface Participant {
  userId: string;
  displayName: string;
  joinedAt: string;
  clearedAt: string | null;
  avatarUrl: string;
  hidden: boolean;
}

interface Group {
  name: string;
  groupAvatarUrl: string;
  createdAt: string;
  createdBy: string;
}

interface LastMessage {
  _id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

type ConversationType = "direct" | "group";

interface PinnedMessage {
  messageId: string;
  pinnedBy: string | null;
  pinnedAt: string | null;
  avatarUrl: string | null;
  displayName: string | null;
  content: string | null;
}

interface Attachment {
  type: "img" | "file";
  url: string;
  createAt: string;
  sender: {
    userId: string;
    displayName: string;
    avatarUrl: string;
  };
}

export type {
  Conversation,
  Participant,
  LastMessage,
  Group,
  ConversationType,
  PinnedMessage,
  Attachment,
};
