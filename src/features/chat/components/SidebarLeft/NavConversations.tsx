import { MenuItem } from "@/features/chat/components/SidebarLeft/MenuItem";
import { conversationTypeToLabel } from "@/features/chat/constant";
import { SidebarChildLayout } from "@/features/chat/layouts/SidebarChildLayout";
import type { Conversation } from "@/features/chat/types/conversation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { useParams } from "@tanstack/react-router";

type Props = {
  conversations: Conversation[];
};
export const NavConversations = ({ conversations }: Props) => {
  const conversationId = useParams({
    strict: false,
    shouldThrow: false,
  })?.conversationId;

  const onlineUsers = useSocketStore((state) => state.onlineUsers);

  const isOnline = (conversation: Conversation) => {
    if (conversation.type === conversationTypeToLabel.direct) {
      const otherParticipant = conversation.participants.find(
        (participant) => participant.username !== useAuthStore.getState().user,
      );
      return otherParticipant
        ? onlineUsers.includes(otherParticipant.userId)
        : false;
    }
    return false;
  };

  const isActive = (conversation: Conversation) => {
    return conversation._id === conversationId;
  };

  return (
    <SidebarChildLayout label="Conversations" className="flex flex-col gap-y-2">
      {conversations.map((conversation) => (
        <MenuItem
          key={conversation._id}
          conversation={conversation}
          isOnline={isOnline(conversation)}
          isActive={isActive(conversation)}
        />
      ))}
    </SidebarChildLayout>
  );
};
