import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Style } from "@/features/chat/layouts/NavbarHeader";
import { useNavigate } from "@tanstack/react-router";
import {
  SettingsIcon,
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";

export const FooterNavbar = () => {
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="mt-auto flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={Style.button}>
            <SettingsIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-100 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side="right"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SparklesIcon />
              Thông tin tài khoản
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Ngôn ngữ
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Theme
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              thông báo
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
