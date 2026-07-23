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
import { useGetUserById } from "@/features/main/hooks/queries/useGetUserById";
import type { Conversation } from "@/features/chat/types/conversation";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import { MenuActions } from "@/features/chat/components/SidebarLeft/MenuActions";

type Props = {
  conversation: Conversation;
  isOnline: boolean;
  isActive: boolean;
};

const Style = {
  container: "flex items-start gap-x-2 min-h-[70px] cursor-pointer",
  containerItem: "flex items-center gap-x-2",
  avatar: "h-10 w-10 shrink-0",
  name: "truncate",
  lastMessage: "text-muted-foreground text-sm truncate",
  lastMessageTimeAgo: "text-muted-foreground text-xs",
  buttonAction:
    "cursor-pointer hover:bg-gray-5 absolute top-1/2 right-2 z-10 -translate-y-1/2 transform items-center rounded-full p-2 opacity-0 dark:bg-primary dark:hover:bg-accent bg-background group-hover/menu-item:opacity-100 shadow-md transition-opacity",
};

export const MenuItem = ({ conversation, isOnline, isActive }: Props) => {
  const { data: me } = useGetMe();

  const navigate = useNavigate();
  const isDirectConversation =
    conversation.type === conversationTypeToLabel.direct;

  const participantsName = conversation.participants
    .filter((participant) => participant.userId !== me?._id)
    .map((participant) => participant.displayName)
    .join(", ");

  const friends = conversation.participants.find(
    (participant) => participant.userId !== me?._id,
  );
  const { data: userById } = useGetUserById(friends?.userId || "");

  const unreadCount = conversation.unreadCount[me?._id] || 0;

  const isLastMessageFromMe = conversation.lastMessage?.senderId === me?._id;
  const lastMessageTimeAgo = timeAgo(conversation?.lastMessageAt || "");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          Style.container,
          isActive && "bg-primary/5 dark:bg-accent",
        )}
        onClick={() => navigate({ to: `/chat/${conversation._id}` })}
        asChild
      >
        {isDirectConversation ? (
          <div className={Style.containerItem}>
            <Avatar className={Style.avatar}>
              <AvatarImage src={userById?.avatarUrl} alt="@shadcn" />
              <AvatarFallback>
                {friends?.displayName?.[0]?.toUpperCase()}
              </AvatarFallback>
              <AvatarBadge
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
            </Avatar>
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between">
                <div className="truncate">{friends?.displayName}</div>
                <span className={Style.lastMessageTimeAgo}>
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
          <div className={Style.containerItem}>
            <Avatar className={Style.avatar}>
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
                <span className={Style.lastMessageTimeAgo}>
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

      {/* menu action */}
      <MenuActions
        style={Style.buttonAction}
        conversationId={conversation._id}
      />
    </SidebarMenuItem>
  );
};
