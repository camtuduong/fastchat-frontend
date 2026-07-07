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
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const ProfileDialog = ({ open, onOpenChange }: Props) => {
  const { data: me } = useGetMe();

  const firstName = me?.displayName?.split(" ")[0] || "";
  const lastName = me?.displayName?.split(" ").slice(1).join(" ") || "";

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
              <UploadAvatar />
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
                <Label htmlFor="name-1">First Name</Label>
                <Input id="name-1" name="name" defaultValue={firstName} />
              </Field>
              <Field>
                <Label htmlFor="name-2">Last Name</Label>
                <Input id="name-2" name="name" defaultValue={lastName} />
              </Field>
            </div>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                defaultValue={me?.username}
              />
            </Field>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" defaultValue={me?.email} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
