import type { MessageUI } from "@/features/chat/types/bubbleChat";
import type {
  Conversation,
  Participant,
} from "@/features/chat/types/conversation";
import type { Socket } from "socket.io-client";

export interface AuthState {
  accessToken: string | null;
  userId: string | null;
  displayName: string | null;
  isLoading: boolean;

  clearAuth: () => void;
  setUser: (userId: string, displayName: string | null) => void;
}

export interface SocketState {
  socket: Socket | null;
  onlineUsers: string[]; // List of online user IDs
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export interface MessageState {
  message: MessageUI[] | null;
  replyMessage: MessageUI | null;

  setReplyMessage: (message: MessageUI) => void;
  clearReplyMessage: () => void;
}

export interface ConversationStore {
  conversationDataDetail: Conversation | null;
  setConversationDataDetail: (
    conversationDataDetail: Conversation | null,
  ) => void;
  clearConversationDataDetail: () => void;
}

export interface CustomSidebarStore {
  open: boolean;
  status: SidebarStatusType | null;

  setOpen: (open: boolean) => void;
  setStatus: (status: SidebarStatusType) => void;
  clearStatus: () => void;
}

export type SidebarStatusType =
  | "default"
  | "pinned"
  | "members"
  | "shared"
  | "settings"
  | "notifications"
  | null;

export type UserState = {
  users: Record<string, Participant>;

  addUsers: (users: Participant[]) => void;

  updateUser: (user: Participant) => void;

  removeUser: (id: string) => void;

  clear: () => void;
};
