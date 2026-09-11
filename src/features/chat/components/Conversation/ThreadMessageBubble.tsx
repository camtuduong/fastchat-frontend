import { Thread } from "@/assets/Thread";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { SIDEBAR_CONTENT_STATUS } from "@/utils/constant";
import { cn } from "@/lib/utils";
import { useGetThreadSurface } from "@/features/chat/hooks/queries/useGetThreadSurface";

type Props = {
  isMyMessage: boolean;
  threadId: string;
};

const STYLES = {
  container: `text-muted-foreground flex gap-1 text-xs`,
  threadContainer: `flex items-center px-0.5 pt-1.5`,
  button: `hover:bg-bubble-other cursor-pointer rounded-sm p-1 flex gap-1`,
  avatarContainer: `relative h-6 w-6`,
  avatar: `absolute h-5 w-5`,
};
export const ThreadMessageBubble = ({ isMyMessage, threadId }: Props) => {
  const { t } = useTranslation();
  const setThreadId = useCustomSidebarStore((state) => state.setThreadId);
  const setStatus = useCustomSidebarStore((state) => state.setStatus);
  const setOpen = useCustomSidebarStore((state) => state.setOpen);

  const { data: threadSurfaceData } = useGetThreadSurface(threadId);
  return (
    <div
      className={`${STYLES.container} ${isMyMessage ? "" : "flex-row-reverse"}`}
      onClick={() => {
        setThreadId(threadId);
        setStatus(SIDEBAR_CONTENT_STATUS.THREAD_DETAIL);
        setOpen(true);
      }}
    >
      <div
        className={`${STYLES.threadContainer} ${isMyMessage ? "" : "flex-row-reverse"}`}
      >
        <button
          className={cn(STYLES.button, isMyMessage ? "" : "flex-row-reverse")}
        >
          {threadSurfaceData?.unreadCount > 0 && (
            <span className="text-xs text-blue-500 italic">
              {t("chat.threadNewMessages", {
                count: threadSurfaceData?.unreadCount,
              })}
            </span>
          )}
          {threadSurfaceData?.unreadCount > 0 &&
            threadSurfaceData?.countMessageInThread && <span>-</span>}
          {threadSurfaceData?.countMessageInThread && (
            <span className="text-muted-foreground text-xs">
              {t("chat.threadMessageCount", {
                count: threadSurfaceData?.countMessageInThread,
              })}
            </span>
          )}
        </button>
        {!isMyMessage && (
          <div className={STYLES.avatarContainer}>
            <Avatar className={STYLES.avatar}>
              <AvatarImage
                src={threadSurfaceData?.lastSender?.avatarUrl}
                alt="Thread"
              />
              <AvatarFallback>
                {threadSurfaceData?.lastSender?.displayName?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      <Thread
        className={` ${isMyMessage ? "text-chart-5/50 scale-x-[-1]" : "text-bubble-other"}`}
      />
    </div>
  );
};
