import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarHeader } from "@/components/ui/sidebar";
import { SelectUsersDialog } from "@/features/chat/components/SelectUsersDialog";
import { useCreateNewConversation } from "@/features/chat/hooks/useCreateNewConversation";
import { useNavigate } from "@tanstack/react-router";
import { Search, SquarePen } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SidebarHeaderAndSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: createConversationMutation, isPending } =
    useCreateNewConversation();

  const handleCreateGroup = async (userIdsSelected: string[]) => {
    if (userIdsSelected.length === 0 || isPending) {
      return;
    }

    try {
      const result = await createConversationMutation({
        participants: userIdsSelected,
      });
      navigate({ to: `/chat/${result.conversation}` });
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <SidebarHeader className="flex flex-col gap-2 px-2 pt-3 pb-0">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xl font-semibold">{t("chat.sidebarTitle")}</div>
        <div className="flex gap-1">
          <SelectUsersDialog
            title={t("chat.createConversation")}
            onSubmit={handleCreateGroup}
            isPending={isPending}
            buttonTrigger={
              <Button className="h-8 w-8 p-1" variant="icon" size="icon">
                <SquarePen className="size-3" />
              </Button>
            }
          />
        </div>
      </div>
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          autoComplete="one-time-code"
          className="bg-search-bg! border-search-border text-foreground placeholder:text-muted-foreground focus:border-search-focus-border pl-9 placeholder:text-xs"
          id="search-input"
          placeholder={t("common.search")}
          type="search"
        />
      </div>
    </SidebarHeader>
  );
};
