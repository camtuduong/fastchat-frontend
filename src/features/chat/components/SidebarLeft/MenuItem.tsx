import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { LastMessageItem } from "@/features/chat/components/SidebarLeft/LastMessageItem";
import { conversationTypeToLabel, timeAgo } from "@/features/chat/constant";
import { useGetUserById } from "@/features/chat/hooks/queries/useGetUserById";
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
  const { data: userById } = useGetUserById(friends?.userId || "");

  const unreadCount = conversation.unreadCount[me?.userId] || 0;

  const isLastMessageFromMe = conversation.lastMessage?.senderId === me?._id;
  const lastMessageTimeAgo = timeAgo(conversation?.lastMessageAt || "");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={Style.content}
        onClick={() => navigate({ to: `/chat/${conversation._id}` })}
        asChild
      >
        {isDirectConversation ? (
          <div className="flex items-center gap-x-2">
            <Avatar className="shrink-0">
              <AvatarImage
                src={userById?.avatarUrl}
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>
                {friends?.username[0].toUpperCase()}
              </AvatarFallback>
              <AvatarBadge
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
            </Avatar>
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between">
                <div className="truncate">{friends?.username}</div>
                <span className="text-muted-foreground text-xs">
                  {lastMessageTimeAgo}
                </span>
              </div>
              <LastMessageItem
                unreadCount={unreadCount}
                LastMessage={conversation?.lastMessage}
                isLastMessageFromMe={isLastMessageFromMe}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <Avatar className="shrink-0">
              <AvatarImage
                src={conversation?.group?.avatarUrl || ""}
                alt={conversation?.group?.name || "Group Avatar"}
              />
              <AvatarFallback>GR</AvatarFallback>
              <AvatarBadge
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
            </Avatar>
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  {conversation?.group?.name || participantsName}
                </div>
                <span className="text-muted-foreground text-xs">
                  {lastMessageTimeAgo}
                </span>
              </div>
              <LastMessageItem
                unreadCount={unreadCount}
                LastMessage={conversation?.lastMessage}
                isLastMessageFromMe={isLastMessageFromMe}
              />
            </div>
          </div>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
