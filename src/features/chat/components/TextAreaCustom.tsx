import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const CustomTextArea = ({
  className,
  value,
  onChange,
  onKeyDown,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Textarea
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={(e) => {
        const minHeight = 48; // min-h-12
        setIsExpanded(e.currentTarget.scrollHeight > minHeight + 4);
      }}
      className={cn(
        "max-h-48 min-h-12 px-4 pt-2 pb-1.75 text-base leading-6 transition-[border-radius]",
        isExpanded ? "rounded-3xl" : "rounded-full",
        className,
      )}
    />
  );
};
