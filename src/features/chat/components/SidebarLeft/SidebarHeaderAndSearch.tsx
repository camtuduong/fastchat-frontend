import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarHeader } from "@/components/ui/sidebar";
import { SelectUsersDialog } from "@/features/chat/components/SelectUsersDialog";
import { conversationTypeToLabel } from "@/features/chat/constant";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import { useNavigate } from "@tanstack/react-router";
import { Search, SquarePen } from "lucide-react";

// const sortValue = [
//   { value: "all", label: "All" },
//   { value: "unread", label: "Unread" },
//   { value: "group", label: "Group" },
// ];
export const SidebarHeaderAndSearch = () => {
  const navigate = useNavigate();
  const { mutateAsync: createGroupMutation, isPending } =
    useCreateNewConversation();

  const handleCreateGroup = async (userIdsSelected: string[]) => {
    if (userIdsSelected.length === 0 || isPending) {
      return;
    }

    try {
      const result = await createGroupMutation({
        type:
          userIdsSelected.length === 1
            ? conversationTypeToLabel.direct
            : conversationTypeToLabel.group,
        participants: userIdsSelected,
      });
      navigate({ to: `/chat/${result.conversation}` });
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <SidebarHeader className="flex flex-col gap-2 px-4 py-3">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="text-lg font-semibold">Chats with Friends</div>
        <div className="flex gap-1">
          <SelectUsersDialog
            title="Create Conversation"
            onSubmit={handleCreateGroup}
            isPending={isPending}
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
          autoComplete="one-time-code"
          className="bg-background pl-9"
          id="search-input"
          placeholder="Search..."
          type="search"
        />
      </div>

      {/* <div className="mt-2 flex items-center gap-2">
        {sortValue.map((item) => (
          <Button key={item.value} className="p-2" variant="outline" size="sm">
            {item.label}
          </Button>
        ))}
      </div> */}
    </SidebarHeader>
  );
};
