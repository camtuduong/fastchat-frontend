import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import type { SocketState } from "@/types/store";
import { queryClient } from "@/lib/queryClient";
import type { GetAllMessagesResponse } from "@/features/chat/api/getAllMessages";
import type { Conversation } from "@/features/chat/types/conversation";

const baseUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [], // List of online user IDs

  connectSocket: () => {
    const accessToken = useAuthStore.getState().accessToken;
    const existingSocket = get().socket;

    if (existingSocket) {
      console.warn("Socket is already connected.");
      return;
    }

    if (!accessToken) {
      console.error("Access token is missing. Cannot connect to socket.");
      return;
    }

    const socket: Socket = io(baseUrl, {
      auth: {
        token: accessToken,
      },
      transports: ["websocket"],
    });

    set({ socket });
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("online-users", (userIds) => {
      set({ onlineUsers: userIds });
    });

    //new message
    socket.on("new-message", ({ message, conversation, unreadCount }) => {
      const conversationId = conversation._id.toString();

      // Append new message vào cache của conversation đang mở
      queryClient.setQueryData(
        ["messages", conversationId],
        (oldData: GetAllMessagesResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            messages: [message, ...oldData.messages],
          };
        },
      );

      // Cập nhật lastMessage + unreadCount trong danh sách conversations
      queryClient.setQueriesData(
        { queryKey: ["getAllConversations"] },
        (oldData: { conversations: Conversation[] } | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            conversations: oldData.conversations.map((conv) =>
              conv._id === conversationId
                ? {
                    ...conv,
                    lastMessage: conversation.lastMessage,
                    lastMessageAt: conversation.lastMessageAt,
                    unreadCount,
                  }
                : conv,
            ),
          };
        },
      );

      console.log("New message received:", message);
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
      console.log("Socket disconnected.");
    } else {
      console.warn("No socket to disconnect.");
    }
  },
}));
