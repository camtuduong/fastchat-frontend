import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarHeader } from "@/components/ui/sidebar";
import { CreateGroupDialog } from "@/features/chat/components/CreateGroupDialog";
import { Search, SquarePen } from "lucide-react";

const sortValue = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "group", label: "Group" },
];
export const SidebarHeaderAndSearch = () => {
  return (
    <SidebarHeader className="flex flex-col gap-2 px-4 py-3">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="text-lg font-semibold">Chats with Friends</div>
        <div className="flex gap-1">
          {/* <Button className="p-1" variant="icon" size="icon">
            <Ellipsis />
          </Button> */}
          <CreateGroupDialog
            buttonTrigger={
              <Button className="p-1" variant="icon" size="icon">
                <SquarePen />
              </Button>
            }
          />
        </div>
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

      <div className="mt-2 flex items-center gap-2">
        {sortValue.map((item) => (
          <Button key={item.value} className="p-2" variant="outline" size="sm">
            {item.label}
          </Button>
        ))}
      </div>
    </SidebarHeader>
  );
};
