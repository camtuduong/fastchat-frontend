import { Thread } from "@/assets/Thread";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  isMyMessage: boolean;
};

const STYLES = {
  container: `text-muted-foreground flex gap-1 text-xs`,
  threadContainer: `flex items-center px-0.5 pt-1.5`,
  button: `hover:bg-bubble-other cursor-pointer rounded-sm p-1`,
  avatarContainer: `relative h-6 w-16`,
  avatar: `absolute h-5 w-5`,
};
export const ThreadMessageBubble = ({ isMyMessage }: Props) => {
  return (
    <div
      className={`${STYLES.container} ${isMyMessage ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`${STYLES.threadContainer} ${isMyMessage ? "" : "flex-row-reverse"}`}
      >
        <button className={STYLES.button}>
          <span className="text-muted-foreground text-xs">Thread message</span>
        </button>
        {/* {!isMyMessage && ( */}
        <div className={STYLES.avatarContainer}>
          {Array.from({ length: 4 }).map((_, index) => {
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
