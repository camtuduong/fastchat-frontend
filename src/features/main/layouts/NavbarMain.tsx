import { FooterNavbar } from "@/features/main/layouts/FooterNavbar";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import { MessageCircleMore, BookUser, User } from "lucide-react";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { useState } from "react";
import { ProfileDialog } from "@/features/main/components/ProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Style = {
  button: cn(
    "text-navbar-icon hover:bg-navbar-active flex cursor-pointer items-center justify-center rounded-md bg-navbar p-2",
  ),
};

export const NavbarHeader = () => {
  const { data: me } = useGetMe();
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const isChat = pathname.startsWith("/chat");
  const isFriends = pathname.startsWith("/friends");

  return (
    <div className="bg-navbar z-50 flex w-12 flex-col items-center px-2 py-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar
          className="h-8 w-8 cursor-pointer"
          onClick={() => setProfileOpen(true)}
        >
          <AvatarImage src={me?.avatarUrl} alt="@shadcn" />
          <AvatarFallback colorSeed={me?.username}>
            {me?.username[0].toUpperCase() || <User />}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate({ to: "/chat" })}
            className={cn(Style.button, isChat ? "bg-navbar-active" : "")}
          >
            <MessageCircleMore />
          </button>

          <button
            onClick={() => navigate({ to: "/friends" })}
            className={cn(Style.button, isFriends ? "bg-navbar-active" : "")}
          >
            <BookUser />
          </button>
        </div>
      </div>

      <FooterNavbar setProfileOpen={setProfileOpen} />
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </div>
  );
};
