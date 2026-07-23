import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchUser } from "@/features/chat/components/SearchUser";
import type { User } from "@/features/chat/types/searchUser";
import { useGetUserBySearch } from "@/features/main/hooks/queries/useGetUserBySearch";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, type ReactNode } from "react";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  buttonTrigger: ReactNode;
};
export const CreateGroupDialog = ({ buttonTrigger }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: users } = useGetUserBySearch({ params: debouncedSearch });
  const { mutateAsync: createGroupMutation, isPending } =
    useCreateNewConversation();

  const userIdsSelected = selectedUsers.map((user) => user._id);

  const resetForm = () => {
    setSearchValue("");
    setSelectedUsers([]);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  };

  const handleCreateGroup = async () => {
    if (userIdsSelected.length === 0 || isPending) {
      return;
    }

    try {
      const result = await createGroupMutation({
        type: "group",
        participants: userIdsSelected,
      });
      navigate({ to: `/chat/${result.conversation}` });
    } catch (error) {
      console.error("Failed to create group:", error);
    }
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateGroup();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
          </DialogHeader>
          <SearchUser
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            users={users}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={userIdsSelected.length <= 1 || isPending}
            >
              {isPending ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
