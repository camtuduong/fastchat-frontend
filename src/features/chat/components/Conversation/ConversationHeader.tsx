import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { CustomSidebarTrigger } from "@/components/ui/custom-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { conversationTypeToLabel } from "@/features/chat/constant";
import type { Conversation } from "@/features/chat/types/conversation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";

type Props = {
  conversationData: Conversation | undefined;
};

export const ConversationHeader = ({ conversationData }: Props) => {
  const myUserId = useAuthStore((state) => state.userId);

  const members = conversationData?.participants
    .map((participant) => participant)
    .filter((participant) => participant.userId !== myUserId);

  const onlineUsers = useSocketStore((state) => state.onlineUsers);
  const isOnline = members?.some((member) =>
    onlineUsers.includes(member.userId),
  );

  const renderHeaderConversation = () => {
    switch (conversationData?.type) {
      case conversationTypeToLabel.direct:
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={members?.[0]?.avatarUrl || ""} alt="@shadcn" />
              <AvatarFallback>
                {members
                  ?.map((member) => member.displayName?.[0]?.toUpperCase())
                  .join(", ")}
              </AvatarFallback>
              <AvatarBadge
                className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
              />
            </Avatar>
            <span className="truncate">
              {members?.map((member) => member.displayName).join(", ")}
            </span>
          </div>
        );
      case conversationTypeToLabel.group:
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={conversationData?.group?.avatarUrl || ""}
                alt="@shadcn"
              />
              <AvatarFallback>
                {members
                  ?.map((member) => member.displayName?.[0]?.toUpperCase())
                  .join(", ")}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">
              {conversationData?.group?.name ??
                members?.map((member) => member.displayName).join(", ")}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b">
      <div className="flex gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
        </div>
        {renderHeaderConversation()}
      </div>
      {/* Action buttons */}
      <div className="flex gap-2 px-4">
        <CustomSidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
};
