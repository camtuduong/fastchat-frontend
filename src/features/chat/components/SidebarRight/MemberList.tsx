import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const MemberList = () => {
  const memberList = [];

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
      {memberList.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          No members found.
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {memberList.map((member) => (
            <div
              key={member.id}
              className={cn(
                "bg-accent/5 hover:bg-accent/10 group/pinned-item relative flex cursor-pointer gap-2 rounded p-2",
              )}
            >
              <Avatar>
                <AvatarImage src={member.avatarUrl || ""} />
                <AvatarFallback>
                  {member.displayName?.[0].toUpperCase() || "F"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">
                  {member.displayName}
                </div>
                <div className="text-[12px] text-gray-600">{member.email}</div>
              </div>

              <button
                type="button"
                className="bg-accent-foreground hover:bg-destructive absolute top-1 right-2 cursor-pointer rounded-full p-1 text-white opacity-0 transition-colors duration-100 group-hover/pinned-item:opacity-100"
                onClick={() => {}}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
