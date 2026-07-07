import { Input } from "@/components/ui/input";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Search } from "lucide-react";

export const FriendSearch = () => {
  return (
    <SidebarHeader className="flex flex-col gap-2 px-4 py-3">
      <div className="flex gap-1">
        {/* <Button className="p-1" variant="icon" size="icon">
            <Ellipsis />
          </Button> */}
        {/* <CreateGroupDialog
            buttonTrigger={
              <Button className="p-1" variant="icon" size="icon">
                <SquarePen />
              </Button>
            }
          /> */}
      </div>
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="bg-background pl-9"
          id="search-input"
          placeholder="Search..."
          type="search"
        />
      </div>
    </SidebarHeader>
  );
};
