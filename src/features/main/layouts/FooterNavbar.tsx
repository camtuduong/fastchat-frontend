import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Style } from "@/features/main/layouts/NavbarMain";
import { useTheme } from "@/providers/theme-provider";
import { useUserStore } from "@/stores/useUser";
import { useNavigate } from "@tanstack/react-router";
import {
  SettingsIcon,
  User,
  BellIcon,
  LogOutIcon,
  Sun,
  Moon,
  Languages,
  Check,
} from "lucide-react";

import { type Dispatch } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  setProfileOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const FooterNavbar = ({ setProfileOpen }: Props) => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const clear = useUserStore((state) => state.clear);
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      clear();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  console.log(t("footer", { returnObjects: true }));

  const isLanguageActive = (lng: string) => i18n.language === lng;
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
              <User />
              {t("footer.profile")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Languages />
                {t("footer.language")}:{" "}
                {i18n.language === "en"
                  ? t("footer.english")
                  : t("footer.vietnamese")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onSelect={() => handleLanguageChange("en")}>
                    {t("footer.english")}{" "}
                    {isLanguageActive("en") ? <Check /> : ""}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleLanguageChange("vi")}>
                    {t("footer.vietnamese")}{" "}
                    {isLanguageActive("vi") ? <Check /> : ""}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem
              onSelect={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {theme === "dark" ? <Moon /> : <Sun />}
              {t("footer.theme")}:{" "}
              {theme === "dark" ? t("footer.dark") : t("footer.light")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              {t("footer.notifications")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon />
            {t("footer.logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
