import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> & {
  showOnGroupHover?: boolean;
};

export const ButtonX = ({
  className,
  showOnGroupHover = false,
  type = "button",
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={cn(
        "absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-button-x p-1 text-button-x-text transition-colors duration-100 hover:bg-destructive hover:text-white",
        showOnGroupHover && "opacity-0 group-hover/members-item:opacity-100",
        className,
      )}
      {...props}
    >
      <X size={12} />
    </button>
  );
};
