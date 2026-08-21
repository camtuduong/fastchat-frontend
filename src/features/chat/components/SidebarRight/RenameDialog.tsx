import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
  onSubmit: (newName: string) => void;
  title: string;
  isPending?: boolean;
};
export const RenameDialog = ({
  open,
  onOpenChange,
  onSubmit,
  title,
  isPending,
}: Props) => {
  const { t } = useTranslation();
  const [newName, setNewName] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(newName);
          }}
          className="flex flex-col gap-2"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <input
            autoComplete="one-time-code"
            type="text"
            className="w-full rounded-md border border-gray-300 p-2"
            onChange={(e) => setNewName(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t("common.cancel")}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? t("common.renaming") : t("common.rename")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
