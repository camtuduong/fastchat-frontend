import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Smile } from "lucide-react";
import { useState } from "react";

type Props = {
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  setShowPicker?: React.Dispatch<React.SetStateAction<boolean>>;
  triggerPickerRef?: React.RefObject<HTMLButtonElement | null>;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
};

export const CustomTextArea = ({
  className,
  value,
  onChange,
  onKeyDown,
  placeholder,
  setShowPicker,
  triggerPickerRef,
  inputRef,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <button
        ref={triggerPickerRef}
        type="button"
        onClick={() => {
          setShowPicker?.((prev) => !prev);
        }}
        className="text-muted-foreground absolute top-2.5 right-0 flex cursor-pointer items-center justify-center pr-3 peer-disabled:opacity-50"
      >
        <Smile className="size-5" />
      </button>

      <Textarea
        value={value}
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        onInput={(e) => {
          const minHeight = 48; // min-h-12
          setIsExpanded(e.currentTarget.scrollHeight > minHeight + 4);
        }}
        className={cn(
          "max-h-48 min-h-10 px-4 pt-2 pr-9 pb-1.75 text-base leading-6 transition-[border-radius]",
          isExpanded ? "rounded-3xl" : "rounded-full",
          className,
        )}
      />
    </div>
  );
};
