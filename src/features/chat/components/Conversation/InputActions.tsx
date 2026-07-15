import { Button } from "@/components/ui/button";
import { UploadImg } from "./UploadImg";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CaseSensitive,
  ChevronDown,
  Smile,
  SendHorizontal,
  ChevronUp,
} from "lucide-react";

const Style = {
  container: "flex items-center gap-1",
  actionButtonContainer: "flex gap-1",
  actionButton: (showMarkDown: boolean) =>
    cn(
      "cursor-pointer items-center hover:bg-accent-foreground/10 rounded-md p-2 transition-colors duration-100 bg-transparent text-muted-foreground hover:text-accent-foreground [&_svg]:size-4",
      showMarkDown ? "text-accent-foreground/10" : "",
    ),
};
type Props = {
  setTextFormatter: React.Dispatch<React.SetStateAction<boolean>>;
  triggerPickerRef: React.RefObject<HTMLButtonElement | null>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  isTextFormatter?: boolean;
  showMarkDown: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputActions = ({
  setTextFormatter,
  triggerPickerRef,
  setShowPicker,
  isPending,
  isTextFormatter,
  showMarkDown,
  onChange,
}: Props) => {
  return (
    <div className={Style.container}>
      <Button
        type="button"
        className={cn(
          Style.actionButton(showMarkDown),
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
        <UploadImg onChange={onChange} className={cn(Style.actionButton(showMarkDown))} />
        <Button
          ref={triggerPickerRef}
          type="button"
          onClick={() => {
            setShowPicker?.((prev) => !prev);
          }}
          className={Style.actionButton(showMarkDown)}
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
