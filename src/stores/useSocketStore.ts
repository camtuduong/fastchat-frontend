import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";
import type { SocketState } from "@/types/store";
import { queryClient } from "@/lib/queryClient";
import type { GetAllMessagesResponse } from "@/features/chat/api/getAllMessages";
import type { Conversation } from "@/features/chat/types/conversation";
import type { InfiniteData } from "@tanstack/react-query";
import { messageNotificationSound } from "@/lib/notificationSound";
import { useConversationStore } from "@/stores/useConversationStore";
import { useTextingStore } from "@/stores/useTextingStore";
import type { ThreadSurface } from "@/features/chat/types/thread";

const baseUrl = import.meta.env.VITE_SOCKET_URL;

type ThreadSurfaceUpdate = Pick<
  ThreadSurface,
  "threadId" | "lastSender" | "lastMessageAt"
> & {
  unreadCount: Record<string, number> | null;
};

type TypingEvent = {
  conversationId: string;
  userId: string;
  userDisplayName: string;
};

const typingTimers = new Map<string, ReturnType<typeof setTimeout>>();

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

    //new thread in conversation
    socket.on("new-thread", ({ conversationId, message }) => {
      queryClient.setQueryData<
        InfiniteData<GetAllMessagesResponse, string | null>
      >(["messages", conversationId], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.map((oldMessage) =>
              oldMessage._id === message._id
                ? { ...oldMessage, ...message }
                : oldMessage,
            ),
          })),
        };
      });

      queryClient.invalidateQueries({
        queryKey: ["conversation-by-id", conversationId],
      });
    });

    //thread surface update
    socket.on("thread-surface-update", (thread: ThreadSurfaceUpdate) => {
      const threadId = thread.threadId.toString();
      const userId = useAuthStore.getState().userId;
      console.log("Thread surface update received:", thread);

      queryClient.setQueryData<ThreadSurface>(
        ["thread-surface", threadId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            lastSender: thread.lastSender ?? oldData.lastSender,
            lastMessageAt: thread.lastMessageAt,
            unreadCount: userId
              ? (thread.unreadCount?.[userId] ?? 0)
              : oldData.unreadCount,
            countMessageInThread: oldData.countMessageInThread + 1,
          };
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["thread-surface", threadId],
      });
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

      // notification sound
      const conversationDetail =
        useConversationStore.getState().conversationDataDetail;

      const isCurrentConversation =
        message.conversationId === conversationDetail?._id;

      const isWindowFocused = document.hasFocus();

      if (!isCurrentConversation || !isWindowFocused) {
        messageNotificationSound();
      }
    });

    socket.on(
      "delete-message",
      ({ conversation }: { conversation: Conversation }) => {
        const conversationId = conversation._id.toString();

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
                    }
                  : conv,
              ),
            };
          },
        );

        queryClient.invalidateQueries({
          queryKey: ["messages", conversationId],
        });
      },
    );

    socket.on("pin-message", ({ message, conversation, unreadCount }) => {
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
      queryClient.invalidateQueries({
        queryKey: ["conversation-by-id", conversationId],
      });
    });

    socket.on("unpinned-message", (conversationId) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversation-by-id", conversationId],
      });
    });

    //member in group
    socket.on("add-member", ({ conversationId }) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversation-by-id", conversationId],
      });
    });

    socket.on("remove-member", ({ conversationId }) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversation-by-id", conversationId],
      });
    });

    //update group avatar
    socket.on("change-group-avatar", ({ conversationId, groupAvatarUrl }) => {
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
                    group: {
                      ...conv.group,
                      groupAvatarUrl,
                    },
                  }
                : conv,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["conversation-by-id", conversationId],
      });
    });

    socket.on("rename_group", ({ conversationId, newName }) => {
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
                    group: {
                      ...conv.group,
                      name: newName,
                    },
                  }
                : conv,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["conversation-by-id", conversationId],
      });
    });

    socket.on(
      "typing",
      ({ conversationId, userId, userDisplayName }: TypingEvent) => {
        console.log(`User typing in conversation ${conversationId}: ${userId}`);

        const typingKey = `${conversationId}:${userId}`;
        const previousTimer = typingTimers.get(typingKey);

        useTextingStore
          .getState()
          .setUserTexting(conversationId, userId, userDisplayName);

        if (previousTimer !== undefined) {
          clearTimeout(previousTimer);
        }

        typingTimers.set(
          typingKey,
          setTimeout(() => {
            useTextingStore.getState().clearUserTexting(conversationId, userId);
            typingTimers.delete(typingKey);
          }, 5000),
        );
      },
    );

    socket.on("stopped-typing", ({ conversationId, userId }: TypingEvent) => {
      console.log(
        `User stopped typing in conversation ${conversationId}: ${userId}`,
      );

      const typingKey = `${conversationId}:${userId}`;
      const timer = typingTimers.get(typingKey);

      if (timer !== undefined) {
        clearTimeout(timer);
        typingTimers.delete(typingKey);
      }

      useTextingStore.getState().clearUserTexting(conversationId, userId);
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
