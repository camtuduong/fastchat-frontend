import { MenuItem } from "@/features/chat/components/SidebarLeft/MenuItem";
import { SidebarChildLayout } from "@/features/chat/layouts/SidebarChildLayout";
import type { Conversation } from "@/features/chat/types/conversation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { useParams } from "@tanstack/react-router";

type Props = {
  conversations: Conversation[];
};
export const NavConversations = ({ conversations }: Props) => {
  const myUserId = useAuthStore((state) => state.userId);
  const conversationId = useParams({
    strict: false,
    shouldThrow: false,
  })?.conversationId;

  const onlineUsers = useSocketStore((state) => state.onlineUsers);

  const isActive = (conversation: Conversation) => {
    return conversation._id === conversationId;
  };

  return (
    <SidebarChildLayout label="Conversations" className="flex flex-col gap-y-2">
      {conversations.map((conversation) => {
        const members = conversation?.participants
          .map((participant) => participant)
          .filter((participant) => participant.userId !== myUserId);

        const isOnline = members?.some((member) =>
          onlineUsers.includes(member.userId),
        );

        return (
          <MenuItem
            key={conversation._id}
            conversation={conversation}
            isOnline={isOnline}
            isActive={isActive(conversation)}
          />
        );
      })}
    </SidebarChildLayout>
  );
};
