import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog } from "@/features/chat/components/AlertDialog";
import { timeAgo } from "@/features/chat/constant";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import { Badge } from "@/features/friends/components/Badge";
import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { TitleAndSearch } from "@/features/friends/components/TitleAndSearch";
import {
  getLabelAndIconByPath,
  TypeListFriendRequestLabel,
} from "@/features/friends/constant";
import { useGetAllFriendRequests } from "@/features/friends/hooks/queries/useGetAllFriendRequests";
import { useAcceptFriendRequest } from "@/features/friends/hooks/useAcceptFriendRequest";
import { useDeclineFriendRequest } from "@/features/friends/hooks/useDeclineFriendRequest";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import type { FriendRequestType } from "@/features/friends/types/request";
import { cn } from "@/lib/utils";
import { Style } from "@/style";
import type { AxiosConversationError } from "@/types/api";
import {
  DATE_FORMAT,
  getRequestUser,
  groupedForRequests,
} from "@/utils/constant";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ListFriendsRequestPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const path = useGetPath();
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState<FriendRequestType>(
    TypeListFriendRequestLabel.received,
  );

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const { labelKey, icon } = getLabelAndIconByPath(path);

  // const debouncedSearch = useDebounce(searchValue, 500);
  const { data: request, isLoading } = useGetAllFriendRequests();

  const { mutateAsync: createGroupMutation, isPending } =
    useCreateNewConversation();
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest();
  const { mutate: declineFriendRequest, isPending: isDeclining } =
    useDeclineFriendRequest();

  const listUserInfoRequest =
    type === TypeListFriendRequestLabel.received
      ? (request?.received.map((req) => req) ?? [])
      : (request?.sent.map((req) => req) ?? []);

  const groupedFriends = groupedForRequests(listUserInfoRequest, type);

  const handleSetType = (newType: FriendRequestType) => {
    setType(newType);
  };

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
    if (!open) {
      setSelectedRequestId(null);
    }
  };

  const handleConfirm = (requestId: string) => {
    declineFriendRequest(requestId, {
      onSuccess: () => setSelectedRequestId(null),
    });
  };

  const handleAcceptFriendRequest = (requestId: string) => {
    acceptFriendRequest(requestId);
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
            <Button
              variant={
                type === TypeListFriendRequestLabel.received
                  ? "default"
                  : "outline"
              }
              className="rounded-full"
              onClick={() => handleSetType(TypeListFriendRequestLabel.received)}
            >
              {t("friends.requests.received")} ·{" "}
              {request?.received?.length ?? 0}
            </Button>
            <Button
              variant={
                type === TypeListFriendRequestLabel.sent ? "default" : "outline"
              }
              className="rounded-full"
              onClick={() => handleSetType(TypeListFriendRequestLabel.sent)}
            >
              {t("friends.requests.sent")} · {request?.sent?.length ?? 0}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner className="size-6" />
          </div>
        ) : (
          <>
            {groupedFriends && Object.keys(groupedFriends).length === 0 ? (
              <div
                className={cn(
                  Style.dashboardEmptyContainer,
                  "border-border bg-muted/20 rounded-xl border border-dashed",
                )}
              >
                <div className="text-2xl font-bold">
                  {type === TypeListFriendRequestLabel.received
                    ? t("friends.requests.noRequests.title")
                    : t("friends.requests.noSentRequests.title")}
                </div>
                <div className="text-muted-foreground">
                  {type === TypeListFriendRequestLabel.received
                    ? t("friends.requests.noRequests.description")
                    : t("friends.requests.noSentRequests.description")}
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
                        {groupedFriends[letter].map((request) => {
                          const friend = getRequestUser(request, type);
                          return (
                            <div
                              key={request._id}
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
                                  <div className="flex items-center gap-2">
                                    <span className="block truncate text-[16px] font-semibold">
                                      {friend.displayName}
                                    </span>
                                    ・
                                    <span className="block truncate text-[12px]">
                                      {timeAgo(request.createdAt || "")}
                                    </span>
                                  </div>
                                  <span className="text-muted-foreground block truncate text-xs">
                                    {request.message}
                                  </span>
                                </span>
                              </button>

                              {type === TypeListFriendRequestLabel.received ? (
                                <div className="mr-2 flex gap-2">
                                  <Button
                                    className="bg-button-success hover:bg-button-success-hover text-white"
                                    onClick={() =>
                                      handleAcceptFriendRequest(request._id)
                                    }
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setSelectedRequestId(request._id);
                                    }}
                                    variant="outline"
                                  >
                                    Decline
                                  </Button>
                                </div>
                              ) : (
                                <div className="mr-2 flex gap-2">
                                  <Badge status="pending" />
                                  <Button
                                    onClick={() =>
                                      setSelectedRequestId(request._id)
                                    }
                                    variant="outline"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selectedRequestId !== null && (
        <AlertDialog
          open
          onOpenChange={handleOpenChange}
          onConfirm={() => handleConfirm(selectedRequestId)}
          isPending={isDeclining}
          title={t("friends.requests.alertDialog.title")}
          description={t("friends.requests.alertDialog.description")}
        />
      )}
    </>
  );
};
