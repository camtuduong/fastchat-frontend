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
}
interface Participant {
  userId: string;
  displayName: string;
  joinedAt: string;
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

export type { Conversation, Participant, LastMessage, Group, ConversationType };
