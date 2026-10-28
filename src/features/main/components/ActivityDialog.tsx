import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ActivityItemAction } from "@/features/main/components/ActivityItemAction";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const logs = [
  { id: 1, message: "New message received", avatarUrl: "" },
  { id: 2, message: "Your order has been shipped", avatarUrl: "" },
];
export const ActivityDialog = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center gap-4">
          <h3 className="text-lg font-medium">{t("activity.title")}</h3>
        </DialogHeader>

        <div className="flex min-h-80 flex-col gap-3">
          {logs.length === 0 ? (
            <div className="bg-accent/35 flex items-center justify-center rounded-lg">
              <p className="text-muted-foreground text-sm">
                {t("activity.noNotifications")}
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <Button className="rounded-full">{t("common.all")}</Button>
                <Button className="rounded-full">{t("common.unread")}</Button>
              </div>
              <div className="flex flex-col space-y-2">
                {logs.map((log) => (
                  <button
                    key={log.id}
                    type="button"
                    className="hover:bg-accent/35 flex cursor-pointer items-center gap-1 rounded-lg p-2"
                  >
                    <Avatar>
                      <AvatarImage src={log.avatarUrl} />
                      <AvatarFallback>{log.message[0]}</AvatarFallback>
                    </Avatar>
                    <span className="ml-2">{log.message}</span>

                    <ActivityItemAction className="hover:bg-accent ml-auto cursor-pointer rounded-full bg-transparent p-2" />
                  </button>
                ))}
              </div>
            </>
          )}
          {/* <DialogFooter>
          <DialogClose asChild>
            <button className="btn">{t("common.cancel")}</button>
          </DialogClose>
        </DialogFooter> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
