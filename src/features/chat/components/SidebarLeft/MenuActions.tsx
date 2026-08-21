import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog } from "@/features/chat/components/AlertDialog";
import { useFavoriteConversation } from "@/features/chat/hooks/useFavoriteConversation";
import { useRemoveConversationForMe } from "@/features/chat/hooks/useRemoveConversationForMe";
import { MoreHorizontal, Trash2, Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  style: string;
  conversationId: string;
  isFavorite: boolean;
};
export const MenuActions = ({ style, conversationId, isFavorite }: Props) => {
  const { t } = useTranslation();
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { mutateAsync: removeConversationForMe, isPending } =
    useRemoveConversationForMe();

  const { mutateAsync: addFavoriteConversation } = useFavoriteConversation();

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

  const handleFavoriteConversation = async () => {
    try {
      if (!conversationId) {
        return;
      }

      await addFavoriteConversation(conversationId);
    } catch (error) {
      console.error("Error adding favorite conversation:", error);
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
              handleFavoriteConversation();
            }}
          >
            <Star
              fill={isFavorite ? "#ecc94b" : "none"}
              stroke={isFavorite ? "#ecc94b" : "currentColor"}
            />{" "}
            {isFavorite ? t("menuActions.unlike") : t("menuActions.like")}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpenAlertDialog(true);
            }}
          >
            <Trash2 /> {t("menuActions.remove")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <AlertDialog
        open={openAlertDialog}
        onOpenChange={handleOpenChange}
        onConfirm={handleRemoveConversationForMe}
        title={t("menuActions.removeConversation.title")}
        description={t("menuActions.removeConversation.description")}
        isPending={isPending}
      />
    </DropdownMenu>
  );
};
