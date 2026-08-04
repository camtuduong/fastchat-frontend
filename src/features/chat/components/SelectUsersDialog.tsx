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

type Props = {
  buttonTrigger: ReactNode;
  onSubmit: (userIdsSelected: string[]) => Promise<void>;
  isPending: boolean;
  title: string;
};
export const SelectUsersDialog = ({
  buttonTrigger,
  onSubmit,
  isPending,
  title,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: users } = useGetUserBySearch({ params: debouncedSearch });

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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(userIdsSelected);
            handleOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
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
              disabled={userIdsSelected.length === 0 || isPending}
            >
              {isPending ? "Confirming..." : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
