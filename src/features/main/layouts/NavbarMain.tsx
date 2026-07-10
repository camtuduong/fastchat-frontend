import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FooterNavbar } from "@/features/main/layouts/FooterNavbar";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import { MessageCircleMore, BookUser, User } from "lucide-react";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { useState } from "react";
import { ProfileDialog } from "@/features/main/components/ProfileDialog";

export const Style = {
  button: cn(
    "flex items-center justify-center rounded-md bg-primary p-2 text-white hover:bg-muted-foreground cursor-pointer transition-colors duration-300 ease-in-out",
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
    <div className="bg-primary z-100 flex w-16 flex-col items-center px-2 py-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar
          size="lg"
          className="cursor-pointer"
          onClick={() => setProfileOpen(true)}
        >
          <AvatarImage src={me?.avatarUrl} alt="@shadcn" />
          <AvatarFallback>
            {me?.username[0].toUpperCase() || <User />}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate({ to: "/chat" })}
            className={cn(Style.button, isChat ? "bg-muted-foreground" : "")}
          >
            <MessageCircleMore />
          </button>

          <button
            onClick={() => navigate({ to: "/friends" })}
            className={cn(Style.button, isFriends ? "bg-muted-foreground" : "")}
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
