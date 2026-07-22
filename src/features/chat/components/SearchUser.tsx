import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import type { User } from "@/features/chat/types/searchUser";
import { X, Search } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  users?: User[];
  selectedUsers: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
};

export const SearchUser = ({
  searchValue,
  setSearchValue,
  users,
  selectedUsers,
  setSelectedUsers,
}: Props) => {
  const [open, setOpen] = useState(false);

  const allUsers = users ?? [];
  const hasSearchValue = searchValue.trim().length > 0;
  const showResults = hasSearchValue && allUsers.length > 0;

  const handleSelect = (user: User) => {
    setSelectedUsers((prev) => {
      if (prev.some((u) => u._id === user._id)) return prev;
      return [...prev, user];
    });
  };

  const handleRemove = (id: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedUsers.map((user) => (
            <span
              key={user._id}
              className="bg-muted flex items-center gap-1.5 rounded-full py-0.5 pr-1.5 pl-1 text-sm"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={user?.avatarUrl} alt={user.displayName} />
                <AvatarFallback className="text-[10px]">
                  {user?.displayName[0]}
                </AvatarFallback>
              </Avatar>
              <span>{user?.displayName}</span>
              <button
                type="button"
                onClick={() => handleRemove(user._id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              className="bg-background pl-9"
              id="search-input"
              placeholder="Search by name or email..."
              type="search"
              value={searchValue}
              onFocus={() => {
                if (hasSearchValue) {
                  setOpen(true);
                }
              }}
              onChange={(e) => {
                const nextValue = e.target.value;

                setSearchValue(nextValue);
                setOpen(nextValue.trim().length > 0);
              }}
            />
          </div>
        </PopoverAnchor>
        {showResults && (
          <PopoverContent
            className="w-85 p-1"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {allUsers.map((user) => {
              const isSelected = selectedUsers.some((u) => u._id === user._id);
              return (
                <button
                  key={user._id}
                  type="button"
                  disabled={isSelected}
                  onClick={() => handleSelect(user)}
                  className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm disabled:opacity-40"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={user?.avatarUrl}
                      alt={user?.displayName}
                    />
                    <AvatarFallback>{user?.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{user.displayName}</span>
                    <span className="text-muted-foreground text-xs">
                      @{user.username}
                    </span>
                  </div>
                </button>
              );
            })}
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};
