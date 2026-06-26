import { MenuItem } from "@/features/chat/components/sidebar/MenuItem";
import { SidebarChildLayout } from "@/features/chat/layouts/SidebarChildLayout";
import type { Conversation } from "@/features/chat/types/conversation";

type Props = {
  conversations: Conversation[];
};
export const NavConversations = ({ conversations }: Props) => {
  return (
    <SidebarChildLayout label="Conversations" className="flex flex-col gap-y-2">
      {conversations.map((conversation) => (
        <MenuItem key={conversation._id} conversation={conversation} />
      ))}
    </SidebarChildLayout>
  );
};
