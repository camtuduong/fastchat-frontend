import { SidebarTriggerHeader } from "@/features/friends/components/SidebarTriggerHeader";
import { getLabelAndIconByPath } from "@/features/friends/constant";
import { useGetPath } from "@/features/friends/hooks/useGetPath";
import { useGetAllFriend } from "@/features/friends/hooks/queries/useGetAllFriends";
import { Style } from "@/style";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { removeVietnameseTones } from "@/utils/constant";
import { Ellipsis, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import type { AxiosError } from "axios";
import type { AxiosConversationError } from "@/types/api";
import { Spinner } from "@/components/ui/spinner";

export const ListFriendsPage = () => {
  const navigate = useNavigate();
  const path = useGetPath();
  const [searchValue, setSearchValue] = useState("");
  const { label, icon } = getLabelAndIconByPath(path);

  const debouncedSearch = useDebounce(searchValue, 500);
  const { mutateAsync: createGroupMutation, isPending } =
    useCreateNewConversation();

  const { data: friends } = useGetAllFriend({ params: debouncedSearch });

  const sortedFriends = [...friends].sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );

  const grouped = sortedFriends.reduce(
    (acc, friend) => {
      const firstLetter = removeVietnameseTones(friend.displayName)
        .charAt(0)
        .toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(friend);
      return acc;
    },
    {} as Record<string, typeof friends>,
  );

  const handleCreateGroup = async (userId: string[]) => {
    if (userId.length === 0 || isPending) {
      return;
    }

    try {
      const result = await createGroupMutation({
        type: "direct",
        participants: userId,
      });
      navigate({ to: result.conversation });
    } catch (error) {
      const err = error as AxiosError<AxiosConversationError>;
      navigate({ to: err.response?.data.conversation });
    }
  };

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <>
      <SidebarTriggerHeader label={label} icon={icon} />
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            className="bg-background pl-9"
            id="search-input"
            placeholder="Search..."
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="text-muted-foreground pl-2 text-sm">
          {friends && friends.length} friend
          {friends && friends.length !== 1 && "s"}
        </div>
      </div>

      {friends && friends.length === 0 ? (
        <div className={Style.dashboardEmptyContainer}>
          <div className="text-2xl font-bold">Cannot find any friends</div>
          <div className="text-muted-foreground">
            Try searching for friends using the search bar above.
          </div>
        </div>
      ) : (
        <div className={cn(Style.dashboardContainer, "mx-4 mb-2")}>
          {Object.keys(grouped).map((letter) => (
            <div key={letter}>
              <div className="mb-2.5 text-xl font-bold">{letter}</div>
              {grouped[letter].map((friend) => (
                <button
                  key={friend._id}
                  className="hover:bg-accent/5 hover:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-md p-2"
                  onClick={() => {
                    handleCreateGroup([friend._id]);
                  }}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt={friend.displayName} />
                    <AvatarFallback>{friend.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{friend.displayName}</span>

                  {/* btn action */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="text-muted-foreground hover:bg-accent-foreground hover:text-accent absolute right-2 cursor-pointer rounded-md p-2 text-sm"
                        onClick={() => {
                          console.log(`Remove friend: ${friend.username}`);
                        }}
                      >
                        <Ellipsis />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Block</DropdownMenuItem>
                        <DropdownMenuItem>Remove</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
