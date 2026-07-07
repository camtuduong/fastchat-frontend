import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarFriendMenu } from "@/features/friends/constant";
import { useNavigate } from "@tanstack/react-router";

const Style = {
  content: "flex items-center gap-x-2 min-h-[50px] cursor-pointer",
};
export const SidebarFriendSidebar = () => {
  const navigate = useNavigate();
  return (
    <SidebarGroup className="flex flex-col gap-y-2">
      <SidebarMenu>
        <SidebarMenuItem>
          {SidebarFriendMenu.map((item) => (
            <SidebarMenuButton
              key={item.url}
              className={Style.content}
              onClick={() => navigate({ to: `/friends${item.url}` })}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
