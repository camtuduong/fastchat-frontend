import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Style } from "@/features/main/layouts/NavbarMain";
import { useTheme } from "@/providers/theme-provider";
import { useUserStore } from "@/stores/useUser";
import { useNavigate } from "@tanstack/react-router";
import {
  SettingsIcon,
  SparklesIcon,
  BadgeCheckIcon,
  BellIcon,
  LogOutIcon,
  Sun,
  Moon,
} from "lucide-react";

import { type Dispatch } from "react";
type Props = {
  setProfileOpen: Dispatch<React.SetStateAction<boolean>>;
};
export const FooterNavbar = ({ setProfileOpen }: Props) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout();
  const clear = useUserStore((state) => state.clear);

  const handleLogout = async () => {
    try {
      await logout();
      clear();
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
            <DropdownMenuItem
              onSelect={() => {
                setProfileOpen((prev) => !prev);
              }}
            >
              <SparklesIcon />
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Language: English
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {theme === "dark" ? <Moon /> : <Sun />}
              {theme === "dark" ? "Dark Theme" : "Light Theme"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
