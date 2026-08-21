import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetMe } from "@/features/auth/hooks/queries/useGetMe";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UploadAvatar } from "@/features/main/components/UploadAvatar";
import { useUploadAvatar } from "@/features/main/hooks/useUploadAvatar";
import { useTranslation } from "react-i18next";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const ProfileDialog = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const { data: me } = useGetMe();

  const firstName = me?.displayName?.split(" ")[0] || "";
  const lastName = me?.displayName?.split(" ").slice(1).join(" ") || "";

  const { mutateAsync: uploadAvatar } = useUploadAvatar();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await uploadAvatar(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="flex flex-row items-center gap-4">
            <div className="relative h-18 w-18">
              <Avatar className="h-18 w-18">
                <AvatarImage src={me?.avatarUrl} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <UploadAvatar handleFileChange={handleFileChange} />
            </div>

            <div className="flex flex-col">
              <span>{me?.displayName}</span>
              <span>@{me?.username}</span>
            </div>
          </DialogHeader>
          <Separator />
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="name-1">{t("profile.firstName")}</Label>
                <Input id="name-1" name="name" defaultValue={firstName} />
              </Field>
              <Field>
                <Label htmlFor="name-2">{t("profile.lastName")}</Label>
                <Input id="name-2" name="name" defaultValue={lastName} />
              </Field>
            </div>
            <Field>
              <Label htmlFor="username-1">{t("profile.username")}</Label>
              <Input
                id="username-1"
                name="username"
                defaultValue={me?.username}
              />
            </Field>
            <Field>
              <Label htmlFor="email-1">{t("profile.email")}</Label>
              <Input id="email-1" name="email" defaultValue={me?.email} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("profile.cancel")}</Button>
            </DialogClose>
            <Button type="submit">{t("profile.saveChanges")}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
