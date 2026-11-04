import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { timeAgo } from "@/features/chat/constant";
import { ReceivedActionButton } from "@/features/friends/components/ReceivedActionButton";
import { useAcceptFriendRequest } from "@/features/friends/hooks/useAcceptFriendRequest";
import { useDeclineFriendRequest } from "@/features/friends/hooks/useDeclineFriendRequest";
import { ActivityItemAction } from "@/features/main/components/ActivityItemAction";
import { transActivityTypeToText } from "@/features/main/components/activityItemContent";
import { SettingActivityNoti } from "@/features/main/components/SettingActivityNoti";
import { actionTypeIcons, activityLogTypes } from "@/features/main/constant";
import type { ActivityLogType } from "@/features/main/types/activity";
import { cn } from "@/lib/utils";
import { BellIcon, Settings } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const logs = [
  {
    id: "1",
    type: "new_message" as ActivityLogType,
    sender: {
      userId: 1,
      displayName: "John Doe",
      avatarUrl: "",
    },
    isRead: true,
    createdAt: "2026-10-29T04:10:26.337Z",
  },
  {
    id: "2",
    type: "mention" as ActivityLogType,
    sender: {
      userId: 2,
      displayName: "Jane Smith",
      avatarUrl: "",
    },
    isRead: false,
    createdAt: "2026-10-28T04:10:26.337Z",
  },
  {
    id: "3",
    type: "received_friend_request" as ActivityLogType,
    requestId: "req-1",
    sender: {
      userId: 4,
      displayName: "Alice Johnson",
      avatarUrl: "",
    },
    isRead: true,
    createdAt: "2026-10-26T04:10:26.337Z",
  },
  {
    id: "1",
    type: "new_message" as ActivityLogType,
    sender: {
      userId: 1,
      displayName: "John Doe",
      avatarUrl: "",
    },
    isRead: true,
    createdAt: "2026-10-29T04:10:26.337Z",
  },
  {
    id: "2",
    type: "mention" as ActivityLogType,
    sender: {
      userId: 2,
      displayName: "Jane Smith",
      avatarUrl: "",
    },
    isRead: false,
    createdAt: "2026-10-28T04:10:26.337Z",
  },
  {
    id: "3",
    type: "received_friend_request" as ActivityLogType,
    requestId: "req-1",
    sender: {
      userId: 4,
      displayName: "Alice Johnson",
      avatarUrl: "",
    },
    isRead: false,
    createdAt: "2026-10-26T04:10:26.337Z",
  },
  {
    id: "1",
    type: "new_message" as ActivityLogType,
    sender: {
      userId: 1,
      displayName: "John Doe",
      avatarUrl: "",
    },
    isRead: true,
    createdAt: "2026-10-29T04:10:26.337Z",
  },
  {
    id: "2",
    type: "mention" as ActivityLogType,
    sender: {
      userId: 2,
      displayName: "Jane Smith",
      avatarUrl: "",
    },
    isRead: false,
    createdAt: "2026-10-28T04:10:26.337Z",
  },
  {
    id: "3",
    type: "received_friend_request" as ActivityLogType,
    requestId: "req-1",
    sender: {
      userId: 4,
      displayName: "Alice Johnson",
      avatarUrl: "",
    },
    isRead: false,
    createdAt: "2026-10-26T04:10:26.337Z",
  },
];

export const ActivityDialog = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const [activityNotiOpen, setActivityNotiOpen] = useState(false);

  const { mutate: acceptFriendRequest, isPending: isAccepting } =
    useAcceptFriendRequest();
  const { mutate: declineFriendRequest, isPending: isDeclining } =
    useDeclineFriendRequest();

  const handleAcceptFriendRequest = (requestId: string) => {
    console.log("Accepting friend request with ID:", requestId);
    acceptFriendRequest(requestId);
  };
  const handleRejectFriendRequest = (requestId: string) => {
    console.log("Rejecting friend request with ID:", requestId);
    declineFriendRequest(requestId);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center gap-4">
          <h3 className="text-lg font-semibold">{t("activity.title")}</h3>
        </DialogHeader>

        <div
          className={`flex h-120 flex-col gap-3 overflow-hidden ${logs.length === 0 ? "items-center justify-center" : ""}`}
        >
          <div className="flex items-center justify-between">
            {logs.length > 0 && (
              <div className="flex gap-1">
                <Button className="rounded-full p-3">{t("common.all")}</Button>
                <Button className="rounded-full p-3">
                  {t("common.unread")}
                </Button>
              </div>
            )}
            <SettingActivityNoti
              open={activityNotiOpen}
              onOpenChange={setActivityNotiOpen}
              buttonTrigger={
                <button
                  type="button"
                  className={cn(
                    "text-muted-foreground hover:text-foreground ml-auto cursor-pointer transition-colors duration-200",
                    activityNotiOpen ? "text-foreground" : "",
                  )}
                >
                  <Settings className="size-5" />
                </button>
              }
            />
          </div>

          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg text-center">
              <BellIcon className="text-muted-foreground bg-accent size-12 rounded-full p-3" />
              <p className="text-lg font-semibold">{t("activity.caughtUp")}</p>
              <p className="text-muted-foreground w-2/3 text-sm">
                {t("activity.noNotifications")}
              </p>
            </div>
          ) : (
            <div className="flex flex-1 shrink-0 flex-col space-y-1 overflow-y-auto px-2">
              {logs.map((log) => {
                const IconByType = actionTypeIcons[log.type];
                return (
                  <button
                    key={log.id}
                    type="button"
                    className={`group hover:bg-accent flex cursor-pointer items-center gap-1 rounded-lg p-2 ${
                      !log.isRead ? "bg-accent/45" : ""
                    }`}
                  >
                    <Avatar className="relative size-10">
                      <AvatarImage src={log.sender.avatarUrl} />
                      <AvatarFallback>
                        {log.sender.displayName[0]}
                      </AvatarFallback>
                      {IconByType && (
                        <AvatarBadge className="bg-accent text-foreground size-4!">
                          <IconByType className="size-3!" />
                        </AvatarBadge>
                      )}
                    </Avatar>
                    <div className="ml-2 flex flex-col items-start">
                      {transActivityTypeToText(
                        log.sender.displayName,
                        log.type,
                      )}
                      <p className="text-muted-foreground text-[13px]">
                        {timeAgo(log.createdAt)}
                      </p>
                      {log.type === activityLogTypes.receivedFriendRequest &&
                        log.requestId && (
                          <ReceivedActionButton
                            requestId={log.requestId}
                            handleAcceptFriendRequest={
                              handleAcceptFriendRequest
                            }
                            isAccepting={isAccepting}
                            handleRejectFriendRequest={() =>
                              handleRejectFriendRequest(log.requestId)
                            }
                            isDeclining={isDeclining}
                            className="mt-2"
                            styleButtonDecline="bg-white"
                          />
                        )}
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <ActivityItemAction className="hover:bg-foreground/30 cursor-pointer rounded-full bg-transparent p-2 opacity-0 transition-colors duration-200 group-hover:opacity-100" />

                      <AvatarBadge
                        className={`border-0.5 border-status-unread-border bg-status-unread relative mr-1 h-2.5 w-2.5 ${!log.isRead ? "opacity-100" : "opacity-0"}`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
