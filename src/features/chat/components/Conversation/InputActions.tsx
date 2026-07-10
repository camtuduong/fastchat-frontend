import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CaseSensitive,
  ChevronDown,
  Upload,
  Smile,
  SendHorizontal,
  ChevronUp,
} from "lucide-react";

const Style = {
  container: "flex items-center gap-1",
  actionButtonContainer: "flex gap-1",
  actionButton:
    "cursor-pointer items-center hover:bg-accent-foreground/10 rounded-md p-2 transition-colors duration-100 bg-transparent text-muted-foreground hover:text-accent-foreground [&_svg]:size-4",
};
type Props = {
  setTextFormatter: React.Dispatch<React.SetStateAction<boolean>>;
  triggerPickerRef: React.RefObject<HTMLButtonElement | null>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  isTextFormatter?: boolean;
};

export const InputActions = ({
  setTextFormatter,
  triggerPickerRef,
  setShowPicker,
  isPending,
  isTextFormatter,
}: Props) => {
  return (
    <div className={Style.container}>
      <Button
        type="button"
        className={cn(
          Style.actionButton,
          isTextFormatter ? "bg-accent text-accent-foreground" : "",
        )}
        onClick={() => {
          setTextFormatter((prev) => !prev);
        }}
      >
        <CaseSensitive size={24} />
        {isTextFormatter ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </Button>
      <Separator
        orientation="vertical"
        className="data-vertical:self-center data-[orientation=vertical]:h-6"
      />
      <div className="flex gap-1">
        <Button type="button" className={Style.actionButton}>
          <Upload size={20} />
        </Button>
        <Button
          ref={triggerPickerRef}
          type="button"
          onClick={() => {
            setShowPicker?.((prev) => !prev);
          }}
          className={Style.actionButton}
        >
          <Smile size={20} />
        </Button>

        <Button type="submit" disabled={isPending}>
          <SendHorizontal size={20} />
        </Button>
      </div>
    </div>
  );
};
