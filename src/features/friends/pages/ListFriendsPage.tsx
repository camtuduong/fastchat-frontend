import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { getLabelAndIconByPath } from "@/features/friends/constant";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import { useGetAllFriend } from "@/features/friends/hooks/queries/useGetAllFriends";
import { Style } from "@/style";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { grouped } from "@/utils/constant";
import { Ellipsis, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import type { AxiosError } from "axios";
import type { AxiosConversationError } from "@/types/api";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";

export const ListFriendsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const path = useGetPath();
  const [searchValue, setSearchValue] = useState("");
  const { labelKey, icon } = getLabelAndIconByPath(path);

  const debouncedSearch = useDebounce(searchValue, 500);
  const { mutateAsync: createGroupMutation, isPending } =
    useCreateNewConversation();

  const { data: friends } = useGetAllFriend({ params: debouncedSearch });

  const groupedFriends = grouped(friends ?? []);

  const handleCreateGroup = async (userId: string[]) => {
    if (userId.length === 0 || isPending) {
      return;
    }

    try {
      const result = await createGroupMutation({
        participants: userId,
      });
      navigate({ to: `/chat/${result.conversation}` });
    } catch (error) {
      const err = error as AxiosError<AxiosConversationError>;
      navigate({ to: `/chat/${err.response?.data.conversation}` });
    }
  };

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <>
      <SidebarTriggerHeader label={t(labelKey)} icon={icon} />
      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold">{t(labelKey)}</h1>
            <p className="text-muted-foreground">
              {t("friends.listDescription")}
            </p>
          </div>
          <span className="text-muted-foreground text-xs">
            {t("friends.count", { count: friends?.length ?? 0 })}
          </span>
        </div>
        <div className="relative w-full">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            autoComplete="one-time-code"
            className="bg-search-bg! border-search-border text-foreground placeholder:text-muted-foreground focus:border-search-focus-border pl-9 placeholder:text-xs"
            id="friends-list-search-input"
            placeholder={t("common.search")}
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {friends && friends.length === 0 ? (
          <div
            className={cn(
              Style.dashboardEmptyContainer,
              "border-border bg-muted/20 rounded-xl border border-dashed",
            )}
          >
            <div className="text-2xl font-bold">
              {t("friends.noFriends.title")}
            </div>
            <div className="text-muted-foreground text-center text-sm">
              {t("friends.noFriends.description")}
            </div>
          </div>
        ) : (
          <div className="border-border bg-background min-h-0 flex-1 overflow-y-auto rounded-xl border">
            <div className="divide-border divide-y">
              {Object.keys(groupedFriends).map((letter) => (
                <section key={letter}>
                  <div className="bg-muted/30 text-muted-foreground px-4 py-2 text-xs font-semibold tracking-wide uppercase">
                    {letter}
                  </div>
                  {groupedFriends[letter].map((friend) => (
                    <div
                      key={friend.userId}
                      className="group hover:bg-panel-row-hover mx-4 flex items-center rounded-lg py-1 transition-colors"
                    >
                      <button
                        type="button"
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-2 py-2 text-left"
                        onClick={() => {
                          handleCreateGroup([friend.userId]);
                        }}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={friend.avatarUrl || undefined}
                            alt={friend.displayName}
                          />
                          <AvatarFallback
                            className="text-xs"
                            colorSeed={friend.displayName}
                          >
                            {friend.displayName?.[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-medium">
                            {friend.displayName}
                          </span>
                          <span className="text-muted-foreground block truncate text-[11px]">
                            {t("friends.openConversation")}
                          </span>
                        </span>
                      </button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-label={t("friends.actions.more")}
                            className="text-muted-foreground hover:bg-accent mr-5 rounded-full transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                            size="icon-sm"
                            variant="ghost"
                          >
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              {t("friends.actions.profile")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {t("friends.actions.block")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {t("friends.actions.remove")}
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
