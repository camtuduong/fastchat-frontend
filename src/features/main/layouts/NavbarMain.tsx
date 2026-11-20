import { FooterNavbar } from "@/features/main/layouts/FooterNavbar";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { MessageCircleMore, BookUser, User } from "lucide-react";
import { useState } from "react";
import { ProfileDialog } from "@/features/main/components/ProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActivityDialog } from "@/features/main/components/ActivityDialog";
import { useAuthStore } from "@/stores/useAuthStore";
import { useGetNotification } from "@/features/main/hooks/queries/useGetNotification";

export const Style = {
  container: "bg-navbar z-50 flex w-12 flex-col items-center px-2 py-4",
  button: cn(
    "text-navbar-icon hover:bg-navbar-active flex cursor-pointer items-center justify-center rounded-md bg-navbar p-2",
  ),
};

export const NavbarHeader = () => {
  const displayName = useAuthStore((state) => state.displayName);
  const avatarUrl = useAuthStore((state) => state.avatarUrl);

  const [profileOpen, setProfileOpen] = useState(false);
  const [activityLogOpen, setActivityLogOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const isChat = pathname.startsWith("/chat");
  const isFriends = pathname.startsWith("/friends");

  const { data: notificationData } = useGetNotification();

  if (!notificationData) return null;

  return (
    <div className={Style.container}>
      <div className="flex flex-col items-center gap-4">
        <Avatar
          className="h-8 w-8 cursor-pointer"
          onClick={() => setProfileOpen(true)}
        >
          <AvatarImage src={avatarUrl ?? ""} alt="@shadcn" />
          <AvatarFallback colorSeed={displayName ?? ""}>
            {displayName ? displayName[0].toUpperCase() : <User />}
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

      <FooterNavbar
        setProfileOpen={setProfileOpen}
        setActivityLogOpen={setActivityLogOpen}
        notification={notificationData}
      />

      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      <ActivityDialog
        open={activityLogOpen}
        onOpenChange={setActivityLogOpen}
        notification={notificationData}
      />
    </div>
  );
};
