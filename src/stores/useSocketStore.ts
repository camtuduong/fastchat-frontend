import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import type { SocketState } from "@/types/store";
import { queryClient } from "@/lib/queryClient";
import type { GetAllMessagesResponse } from "@/features/chat/api/getAllMessages";
import type { Conversation } from "@/features/chat/types/conversation";
import type { InfiniteData } from "@tanstack/react-query";

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

      queryClient.setQueryData<
        InfiniteData<GetAllMessagesResponse, string | null>
      >(["messages", conversationId], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) =>
            index === 0
              ? { ...page, messages: [message, ...page.messages] }
              : page,
          ),
        };
      });

      // Cập nhật lastMessage + unreadCount trong danh sách conversations
      queryClient.setQueriesData<{ conversations: Conversation[] }>(
        { queryKey: ["conversations"] },
        (oldData) => {
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

      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    });

    socket.on("delete-message", ({ conversation }) => {
      console.log("Received delete-message event:", conversation);
      const conversationId = conversation._id.toString();

      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });

      queryClient.setQueriesData<{ conversations: Conversation[] }>(
        { queryKey: ["conversations"] },
        (oldData) => {
          console.log(
            "Updating conversations after delete-message event:",
            oldData,
          );
          if (!oldData) return oldData;
          return {
            ...oldData,
            conversations: oldData.conversations.map((conv) =>
              conv._id === conversationId
                ? {
                    ...conv,
                    lastMessage: conversation.lastMessage,
                    lastMessageAt: conversation.lastMessageAt,
                  }
                : conv,
            ),
          };
        },
      );
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
