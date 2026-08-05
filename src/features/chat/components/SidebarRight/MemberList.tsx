import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Conversation } from "@/features/chat/types/conversation";
import { useAuthStore } from "@/stores/useAuthStore";
import { grouped } from "@/utils/constant";
import { X } from "lucide-react";

type Prop = {
  members: Conversation["participants"];
  onRemoveMember?: (userId: string) => void;
  ownerId?: string;
};

export const MemberList = ({ members, onRemoveMember, ownerId }: Prop) => {
  const userId = useAuthStore((state) => state.userId);
  const groupedMembers = grouped(members ?? []);

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
      {members.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          No members found.
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {Object.keys(groupedMembers).map((letter) => (
            <div key={letter}>
              <div className="mb-2.5 text-xl font-bold">{letter}</div>
              {groupedMembers[letter].map((member) => (
                <div
                  key={member.userId}
                  className="hover:bg-accent/10 group/pinned-item group/members-item relative flex cursor-pointer gap-2 rounded p-2"
                >
                  <Avatar>
                    <AvatarImage
                      src={member?.avatarUrl ?? ""}
                      alt={member?.displayName ?? "User Avatar"}
                    />
                    <AvatarFallback>
                      {member?.displayName?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">
                      {member?.displayName}
                      {member.userId === userId && (
                        <AvatarBadge className="border-0.5 border-status-unread-border bg-status-unread absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2" />
                      )}
                    </div>
                  </div>

                  {member.userId !== userId && member.userId !== ownerId && (
                    <button
                      type="button"
                      className="bg-accent-foreground hover:bg-destructive absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-white opacity-0 transition-colors duration-100 group-hover/members-item:opacity-100"
                      onClick={() => onRemoveMember?.(member.userId)}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
