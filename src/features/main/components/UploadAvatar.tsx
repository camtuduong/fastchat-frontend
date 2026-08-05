import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import type { ChangeEvent } from "react";

type Props = {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
export const UploadAvatar = ({ handleFileChange, className }: Props) => {
  return (
    <label
      className={cn(
        "bg-background text-muted-foreground hover:bg-menu-action-hover border-border absolute right-0 bottom-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border text-sm transition-colors",
        className,
      )}
    >
      <Camera size={16} className="pointer-events-none" />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </label>
  );
};
