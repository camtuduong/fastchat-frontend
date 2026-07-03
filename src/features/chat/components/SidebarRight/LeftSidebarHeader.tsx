import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BellRing, Search } from "lucide-react";

export const LeftSidebarHeader = () => {
  return (
    <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2 px-4 py-4">
      <Avatar className="mt-2 h-18 w-18">
        <AvatarFallback>
          {/* {members
            ?.map((member) => member.username[0].toUpperCase())
            .join(", ")} */}
          Hú
        </AvatarFallback>
      </Avatar>
      <div className="text-sm font-semibold">Group Name</div>

      <div className="flex w-full items-center justify-center gap-8 py-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <Button className="p-1" variant="icon" size="icon-lg">
            <BellRing />
          </Button>
          <span className="text-xs">Mute</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <Button className="p-1" variant="icon" size="icon-lg">
            <Search />
          </Button>
          <span className="text-xs">Search</span>
        </div>
      </div>
    </div>
  );
};
