import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Participant } from "@/features/chat/types/conversation";
import { useSocketStore } from "@/stores/useSocketStore";

type Props = {
  members: Participant[] | undefined;
};

export const ConversationHeader = ({ members }: Props) => {
  const onlineUsers = useSocketStore((state) => state.onlineUsers);
  const isOnline = members?.some((member) =>
    onlineUsers.includes(member.username),
  );
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-6"
        />
        {/* Tên người đang chat */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
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
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile/" className="truncate">
                {members?.map((member) => member.username).join(", ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
