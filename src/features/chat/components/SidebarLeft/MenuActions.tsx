import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog } from "@/features/chat/components/AlertDialog";
import { useRemoveConversationForMe } from "@/features/chat/hooks/useRemoveConversationForMe";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  style: string;
  conversationId: string;
};
export const MenuActions = ({ style, conversationId }: Props) => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { mutateAsync: removeConversationForMe } = useRemoveConversationForMe();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpenAlertDialog(nextOpen);

    if (!nextOpen) {
      setOpenAlertDialog(false);
    }
  };
  const handleRemoveConversationForMe = async () => {
    try {
      await removeConversationForMe(conversationId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={style}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreHorizontal className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setOpenAlertDialog(true);
            }}
          >
            <Trash2 /> Remove
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <AlertDialog
        open={openAlertDialog}
        onOpenChange={handleOpenChange}
        onConfirm={handleRemoveConversationForMe}
        title="Remove Conversation"
        description="Once you delete your copy of this conversation, it cannot be undone."
      />
    </DropdownMenu>
  );
};
