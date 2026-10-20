import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog } from "@/features/chat/components/AlertDialog";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { TitleAndSearch } from "@/features/friends/components/TitleAndSearch";
import { getLabelAndIconByPath } from "@/features/friends/constant";
import { useGetAllFriendRequests } from "@/features/friends/hooks/queries/useGetAllFriendRequests";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import { cn } from "@/lib/utils";
import { Style } from "@/style";
import type { AxiosConversationError } from "@/types/api";
import { grouped } from "@/utils/constant";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ListFriendsRequestPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const path = useGetPath();
  const [searchValue, setSearchValue] = useState("");
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const { labelKey, icon } = getLabelAndIconByPath(path);

  // const debouncedSearch = useDebounce(searchValue, 500);
  const { mutateAsync: createGroupMutation, isPending } =
    useCreateNewConversation();

  const { data: request } = useGetAllFriendRequests();

  const listUserInfoRequest = request?.map((req) => req.fromUserId) ?? [];

  const groupedFriends = grouped(listUserInfoRequest ?? []);

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

  const handleOpenChange = (open: boolean) => {
    setOpenAlertDialog(open);
  };

  const handleConfirm = () => {
    setOpenAlertDialog(false);
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
            description={t("friends.requests.label")}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={t("common.search")}
          />
          <div className="mb-5 ml-2 flex gap-1 self-end">
            <Button variant="default" className="rounded-full">
              {t("friends.requests.received")} · 3
            </Button>
            <Button variant="outline" className="rounded-full">
              {t("friends.requests.sent")} · 1
            </Button>
          </div>
        </div>

        {request && request.length === 0 ? (
          <div
            className={cn(
              Style.dashboardEmptyContainer,
              "border-border bg-muted/20 rounded-xl border border-dashed",
            )}
          >
            <div className="text-2xl font-bold">
              {t("friends.requests.noRequests.title")}
            </div>
            <div className="text-muted-foreground">
              {t("friends.requests.noRequests.description")}
            </div>
          </div>
        ) : (
          <div className="bg-background min-h-0 flex-1 gap-2 overflow-y-auto">
            <div className="border-border rounded-xl border">
              {Object.keys(groupedFriends).map((letter) => (
                <section key={letter}>
                  <div className="bg-muted/80 text-muted-foreground rounded-t-xl px-4 py-2 text-xs font-semibold tracking-wide uppercase">
                    {letter}
                  </div>
                  <div className="m-2">
                    {groupedFriends[letter].map((friend) => (
                      <div
                        key={friend._id}
                        className="group hover:bg-panel-row-hover flex items-center rounded-lg py-1 transition-colors"
                      >
                        <button
                          type="button"
                          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-2 py-2 text-left"
                          onClick={() => {
                            handleCreateGroup([friend._id]);
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

                        <div className="flex gap-2">
                          <Button className="bg-button-success hover:bg-button-success-hover text-white">
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleOpenChange(true)}
                            variant="outline"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>

      <AlertDialog
        open={openAlertDialog}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
        title={t("friends.requests.alertDialog.title")}
        description={t("friends.requests.alertDialog.description")}
      />
    </>
  );
};
