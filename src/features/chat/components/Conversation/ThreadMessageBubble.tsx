import { Thread } from "@/assets/Thread";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetConversationById } from "@/features/chat/hooks/queries/useGetConversationById";
import { useCustomSidebarStore } from "@/stores/useCustomSidebarStore";
import { SIDEBAR_CONTENT_STATUS } from "@/utils/constant";

type Props = {
  isMyMessage: boolean;
  threadId: string;
};

const STYLES = {
  container: `text-muted-foreground flex gap-1 text-xs`,
  threadContainer: `flex items-center px-0.5 pt-1.5`,
  button: `hover:bg-bubble-other cursor-pointer rounded-sm p-1`,
  avatarContainer: `relative h-6 w-16`,
  avatar: `absolute h-5 w-5`,
};
export const ThreadMessageBubble = ({ isMyMessage, threadId }: Props) => {
  const setThreadId = useCustomSidebarStore((state) => state.setThreadId);
  const setStatus = useCustomSidebarStore((state) => state.setStatus);
  const setOpen = useCustomSidebarStore((state) => state.setOpen);

  const { data: conversationData } = useGetConversationById(threadId);
  console.log(conversationData);
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
        <button className={STYLES.button}>
          <span className="text-muted-foreground text-xs">Thread message</span>
        </button>
        {/* {!isMyMessage && ( */}
        <div className={STYLES.avatarContainer}>
          {Array.from({
            length: conversationData?.participants.length ?? 0,
          }).map((_, index) => {
            const positionOffset = `${index * 0.75}rem`;
            return (
              <Avatar
                key={index}
                className={STYLES.avatar}
                style={{
                  [isMyMessage ? "right" : "left"]: positionOffset,
                  zIndex: 3 - index,
                }}
              >
                <AvatarImage src="/thread.svg" alt="Thread" />
                <AvatarFallback>{index + 1}</AvatarFallback>
              </Avatar>
            );
          })}
        </div>
        {/* )} */}
      </div>

      <Thread
        className={` ${isMyMessage ? "text-chart-5/50 scale-x-[-1]" : "text-bubble-other"}`}
      />
    </div>
  );
};
