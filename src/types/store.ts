import type { MessageUI } from "@/features/chat/types/bubbleChat";
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
