import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FooterNavbar } from "@/features/chat/layouts/FooterNavbar";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import { MessageCircleMore, BookUser } from "lucide-react";

export const Style = {
  button: cn(
    "flex items-center justify-center rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600",
  ),
};

export const NavbarHeader = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const isChat = pathname.startsWith("/chat");
  const isFriends = pathname.startsWith("/friends");

  return (
    <div className="z-100 flex w-16 flex-col items-center bg-blue-500 px-2 py-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>hi</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate({ to: "/chat" })}
            className={cn(
              Style.button,
              isChat ? "bg-blue-600 text-white" : "text-gray-400",
            )}
          >
            <MessageCircleMore />
          </button>

          <button
            onClick={() => navigate({ to: "/friends" })}
            className={cn(
              Style.button,
              isFriends ? "bg-blue-600 text-white" : "text-gray-400",
            )}
          >
            <BookUser />
          </button>
        </div>
      </div>

      <FooterNavbar />
    </div>
  );
};
