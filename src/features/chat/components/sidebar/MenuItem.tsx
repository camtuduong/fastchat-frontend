import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { conversationTypeToLabel } from "@/features/chat/constant";
import type { Conversation } from "@/features/chat/types/conversation";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  conversation: Conversation;
  isOnline: boolean;
};

const Style = {
  content: "flex items-start gap-x-2 min-h-[50px] cursor-pointer",
};

export const MenuItem = ({ conversation, isOnline }: Props) => {
  const { data: me } = useGetMe();
  const navigate = useNavigate();
  const isDirectConversation =
    conversation.type === conversationTypeToLabel.direct;

  const participantsName = conversation.participants
    .map((participant) => participant.username)
    .join(", ");

  const friends = conversation.participants.find(
    (participant) => participant.username !== me?.username,
  );

  const unreadCount = conversation.unreadCount[me?.userId] || 0;

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
              <AvatarBadge
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
              <AvatarFallback>
                {friends?.username[0].toUpperCase()}
              </AvatarFallback>

              <AvatarBadge
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
            </Avatar>
            <div className="truncate">
              <div className="truncate">{friends?.username}</div>
              <div className="text-muted-foreground text-xs">
                {unreadCount > 0
                  ? `(${unreadCount} new message${unreadCount > 1 ? "s" : ""})`
                  : `${conversation?.lastMessage?.content ?? ""}`}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Avatar>
              <AvatarImage
                src={conversation?.group?.avatarUrl || ""}
                alt={conversation?.group?.name || "Group Avatar"}
              />
              <AvatarFallback>GR</AvatarFallback>
              <AvatarBadge
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
            </Avatar>
            <div className="truncate">
              <div className="truncate">
                {conversation?.group?.name || participantsName}
              </div>
              <div className="text-muted-foreground text-xs">
                {unreadCount > 0
                  ? `(${unreadCount} new message${unreadCount > 1 ? "s" : ""})`
                  : `${conversation?.lastMessage?.content ?? "No messages yet"}`}
              </div>
            </div>
          </div>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
