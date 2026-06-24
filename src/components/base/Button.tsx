import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled,
  className,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full cursor-pointer rounded-lg border border-(--border-button) py-2.5",
        className,
      )}
    >
      {children || "Button"}
    </button>
  );
}
