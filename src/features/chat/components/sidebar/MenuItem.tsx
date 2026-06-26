import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { Conversation } from "@/features/chat/types/conversation";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  conversation: Conversation;
};

const Style = {
  content: "flex items-start gap-x-2 min-h-[50px] cursor-pointer",
};

export const MenuItem = ({ conversation }: Props) => {
  const navigate = useNavigate();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={Style.content}
        onClick={() => navigate({ to: `/chat/${conversation._id}` })}
        asChild
      >
        <div>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          {/* group name */}
          <div className="truncate">
            <div className="truncate">
              {conversation?.group?.name || "Unnamed Group"}
            </div>
            <div className="text-muted-foreground text-xs">Last message</div>
          </div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
