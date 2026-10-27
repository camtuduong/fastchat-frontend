import type { FriendshipStatus } from "@/features/friends/types/user";
import { cn } from "@/lib/utils";
import { statusClasses, statusLabels } from "@/utils/constant";

export const Badge = ({ status }: { status: FriendshipStatus }) => {
  return (
    <span
      className={cn(
        "flex items-center rounded-full px-2 py-1 text-xs text-white",
        statusClasses[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
};
