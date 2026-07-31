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
}
interface Participant {
  userId: string;
  displayName: string;
  joinedAt: string;
  clearAt: boolean;
  avatarUrl: string;
  hidden: boolean;
}

interface Group {
  name: string;
  avatarUrl: string;
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

export type {
  Conversation,
  Participant,
  LastMessage,
  Group,
  ConversationType,
  PinnedMessage,
};
