import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import { AddFriendDialog } from "@/features/friends/components/AddFriendDialog";
import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { TitleAndSearch } from "@/features/friends/components/TitleAndSearch";
import { getLabelAndIconByPath } from "@/features/friends/constant";
import { useGetAllFriend } from "@/features/friends/hooks/queries/useGetAllFriends";
import { useGetListSuggestUser } from "@/features/friends/hooks/queries/useGetListSuggestUsers";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import { useSendFriendRequest } from "@/features/friends/hooks/useSendFriendRequest";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Style } from "@/style";
import type { AxiosConversationError } from "@/types/api";
import { groupedForFriends } from "@/utils/constant";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { Ellipsis, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ListFriendsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const path = useGetPath();
  const [searchUserToAdd, setSearchUserToAdd] = useState("");
  const [addFriendMessage, setAddFriendMessage] = useState("");

  const [searchMyFriends, setSearchMyFriends] = useState("");

  const { labelKey, icon } = getLabelAndIconByPath(path);

  const debouncedSearchUserToAdd = useDebounce(searchUserToAdd, 500);
  const debouncedSearchMyFriends = useDebounce(searchMyFriends, 500);

  const { data: friends, isLoading: isLoadingFriends } = useGetAllFriend({
    params: debouncedSearchMyFriends,
  });
  const { data: listSuggestUsers, isLoading: isLoadingListSuggestUsers } =
    useGetListSuggestUser(debouncedSearchUserToAdd);

  const { mutateAsync: createGroupMutation, isPending } =
    useCreateNewConversation();
  const { mutate: addFriend } = useSendFriendRequest();

  const groupedFriends = groupedForFriends(friends ?? []);

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

  const handleAddFriend = (toUserId: string) => {
    addFriend({ toUserId, message: addFriendMessage });
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
      <div className="flex min-h-0 flex-1 flex-col px-8 py-4">
        <div className="flex">
          <TitleAndSearch
            className="w-full flex-1"
            title={t(labelKey)}
            description={t("friends.list.description")}
            searchValue={searchMyFriends}
            setSearchValue={setSearchMyFriends}
            placeholder={t("common.search")}
          />
          <div className="mb-5 ml-2 flex shrink-0 flex-col items-end justify-between">
            <span className="text-muted-foreground text-xs">
              {t("friends.list.count", { count: friends?.length ?? 0 })}
            </span>

            <AddFriendDialog
              listSuggestUsers={listSuggestUsers || []}
              searchValue={searchUserToAdd}
              setSearchValue={setSearchUserToAdd}
              isLoadingListSuggestUsers={isLoadingListSuggestUsers}
              buttonTrigger={
                <Button>
                  <UserRoundPlus className="mr-2" />
                  {t("friends.addFriend")}
                </Button>
              }
              addFriendMessage={addFriendMessage}
              setAddFriendMessage={setAddFriendMessage}
              isPending={isPending}
              title={t("friends.addFriend")}
              handleAddFriend={handleAddFriend}
            />
          </div>
        </div>

        {isLoadingFriends ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner className="size-6" />
          </div>
        ) : (
          <>
            {friends && friends.length === 0 ? (
              <div
                className={cn(
                  Style.dashboardEmptyContainer,
                  "border-border bg-muted/20 rounded-xl border border-dashed",
                )}
              >
                <div className="text-2xl font-bold">
                  {t("friends.list.noFriends.title")}
                </div>
                <div className="text-muted-foreground text-center text-sm">
                  {t("friends.list.noFriends.description")}
                </div>
              </div>
            ) : (
              <div className="bg-background min-h-0 flex-1 overflow-y-auto">
                <div className="border-border rounded-xl border">
                  {Object.keys(groupedFriends).map((letter) => (
                    <section key={letter}>
                      <div className="bg-muted/80 text-muted-foreground rounded-t-xl px-4 py-2 text-xs font-semibold tracking-wide uppercase">
                        {letter}
                      </div>
                      <div className="m-2">
                        {groupedFriends[letter].map((friend) => (
                          <div
                            key={friend.userId}
                            className="group hover:bg-panel-row-hover flex items-center rounded-lg py-1 transition-colors"
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
                                <span className="block truncate text-xs font-semibold">
                                  {friend.displayName}
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
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
