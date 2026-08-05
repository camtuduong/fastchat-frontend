import { SquarePen } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
type Props = {
  groupName: string | null;
  setIsRenameDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const GroupName = ({ groupName, setIsRenameDialogOpen }: Props) => {
  return (
    <div
      className="text-panel-foreground group/group-name cursor-pointer text-lg font-bold"
      onClick={() => {
        setIsRenameDialogOpen(true);
      }}
    >
      <span className="select-none">{groupName || "No Name"}</span>
      <SquarePen className="ml-2 inline h-4 w-4 opacity-0 group-hover/group-name:opacity-100" />
    </div>
  );
};
