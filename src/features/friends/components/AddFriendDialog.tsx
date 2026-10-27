import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/features/friends/components/Badge";
import type { SuggestUsers } from "@/features/friends/types/user";
import { Link, Search } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  buttonTrigger: ReactNode;
  isPending: boolean;
  title: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  listSuggestUsers: SuggestUsers[];
  isLoadingListSuggestUsers: boolean;
  handleAddFriend: (toUserId: string, message: string) => void;
  addFriendMessage: string;
  setAddFriendMessage: (value: string) => void;
};

export const AddFriendDialog = ({
  buttonTrigger,
  title,
  searchValue,
  setSearchValue,
  listSuggestUsers,
  isLoadingListSuggestUsers,
  handleAddFriend,
  addFriendMessage,
  setAddFriendMessage,
}: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setSearchValue("");
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="gap-1">
          <DialogTitle>
            <p className="text-xl font-bold">{title}</p>
          </DialogTitle>
          <p className="text-muted-foreground text-xs">
            {t("friends.searchByUsernameEmail")}
          </p>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleOpenChange(false);
          }}
        >
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              autoComplete="one-time-code"
              className="h-12 bg-transparent pl-9"
              id="search-input"
              placeholder={t("common.searchByName")}
              type="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
          {isLoadingListSuggestUsers ? (
            <div className="flex items-center justify-center py-4">
              <Spinner className="size-6" />
            </div>
          ) : (
            <div className="my-4">
              <p className="text-muted-foreground text-xs font-bold">
                People you may know
              </p>
              <div className="mt-2 flex max-h-52 min-h-0 flex-col overflow-y-auto rounded-xl border">
                {listSuggestUsers.map((friend) => (
                  <div
                    key={friend._id}
                    className="flex items-center justify-between border-b p-4 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage
                          src={friend.avatarUrl || "/default-avatar.png"}
                          alt={friend.displayName}
                        />
                        <AvatarFallback>{friend.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <p className="text-sm font-bold">
                          {friend.displayName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {friend.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge status={friend.friendship_status} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          friend.friendship_status === "none"
                            ? handleAddFriend(friend._id, addFriendMessage)
                            : console.log("Cancel friend request", friend._id);
                        }}
                      >
                        {friend.friendship_status === "none" ? "Add" : "Cancel"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2">
            <Input
              autoComplete="one-time-code"
              className="h-12 bg-transparent"
              id="add-friend-message-input"
              placeholder={t("friends.addMessage")}
              type="text"
              value={addFriendMessage}
              onChange={(e) => {
                setAddFriendMessage(e.target.value);
              }}
            />
          </div>
        </form>
        <DialogFooter className="flex flex-col items-center sm:justify-between">
          <p>{t("friends.addFriendDialog.footerMessage")}</p>
          <Button type="submit">
            <Link className="size-3" />
            {t("friends.addFriendDialog.share")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
