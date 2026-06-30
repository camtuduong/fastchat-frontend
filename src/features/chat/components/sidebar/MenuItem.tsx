import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { conversationTypeToLabel } from "@/features/chat/constant";
import type { Conversation } from "@/features/chat/types/conversation";
import { useSocketStore } from "@/stores/useSocketStore";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  conversation: Conversation;
};

const Style = {
  content: "flex items-start gap-x-2 min-h-[50px] cursor-pointer",
};

export const MenuItem = ({ conversation }: Props) => {
  const onlineUsers = useSocketStore((state) => state.onlineUsers);

  console.log("onlineUsers", onlineUsers);

  console.log("conversation", conversation);
  const navigate = useNavigate();
  const isDirectConversation =
    conversation.type === conversationTypeToLabel.direct;

  const participantsName = conversation.participants
    .map((participant) => participant.username)
    .join(", ");

  const isOnline = conversation.participants.some((participant) =>
    onlineUsers.includes(participant.userId),
  );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={Style.content}
        onClick={() => navigate({ to: `/chat/${conversation._id}` })}
        asChild
      >
        {isDirectConversation ? (
          <div>
            <Avatar>
              <AvatarFallback>
                {conversation?.participants[1]?.username[0].toUpperCase()}
              </AvatarFallback>
              {isOnline && (
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              )}
            </Avatar>
            <div className="truncate">
              <div className="truncate">
                {conversation?.participants[1]?.username}
              </div>
              <div className="text-muted-foreground text-xs">Last message</div>
            </div>
          </div>
        ) : (
          <div>
            <Avatar>
              <AvatarImage
                src={conversation?.group?.avatarUrl || ""}
                alt={conversation?.group?.name || "User"}
              />
              <AvatarFallback>GR</AvatarFallback>
              {isOnline && (
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              )}
            </Avatar>
            <div className="truncate">
              <div className="truncate">
                {conversation?.group?.name || participantsName}
              </div>
              <div className="text-muted-foreground text-xs">Last message</div>
            </div>
          </div>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
