interface Conversation {
  _id: string;
  participants: Participant[];
  __v: number;
  lastMessage: Message;
  seenBy: string[];
  type: "direct" | "group";
  unreadCount: {
    [userId: string]: number;
  };
  group: Group;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
interface Participant {
  userId: string;
  username: string;
  joinedAt: Date;
}

interface Group {
  name: string;
  avatarUrl: string;
  createdAt: Date;
  createdBy: string;
}

interface Message {
  _id: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

export type { Conversation, Participant, Message };
