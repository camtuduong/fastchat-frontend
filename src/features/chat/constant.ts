import type { BubblePosition } from "@/features/chat/types/bubbleChat";

export const bubbleClass = (position: BubblePosition, isMyMessage: boolean) => {
  switch (position) {
    case "single":
      return "my-2 rounded-2xl";

    case "first":
      return `${isMyMessage ? "rounded-l-2xl rounded-br-2xl" : "rounded-b-2xl rounded-r-2xl"}`;

    case "middle":
      return `${isMyMessage ? "rounded-l-2xl rounded-r-md" : "rounded-l-md rounded-r-2xl "}`;

    case "last":
      return `mt-2 ${isMyMessage ? "rounded-l-2xl rounded-tr-2xl" : "rounded-t-2xl rounded-r-2xl"}`;
  }
};
