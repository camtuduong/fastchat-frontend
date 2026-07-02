import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { CustomSidebarTrigger } from "@/components/ui/custom-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Participant } from "@/features/chat/types/conversation";
import { useSocketStore } from "@/stores/useSocketStore";
import { Link } from "@tanstack/react-router";

type Props = {
  members: Participant[] | undefined;
};

export const ConversationHeader = ({ members }: Props) => {
  const onlineUsers = useSocketStore((state) => state.onlineUsers);
  const isOnline = members?.some((member) =>
    onlineUsers.includes(member.username),
  );
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
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {members
                ?.map((member) => member.username[0].toUpperCase())
                .join(", ")}
            </AvatarFallback>
            <AvatarBadge
              className={`${isOnline ? "bg-green-600 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"}`}
            />
          </Avatar>
          <Link to="/profile" className="truncate">
            {members?.map((member) => member.username).join(", ")}
          </Link>
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex gap-2 px-4">
        <CustomSidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
};
