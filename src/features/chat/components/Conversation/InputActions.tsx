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
  Sticker,
} from "lucide-react";

const Style = {
  container: "flex items-center gap-1",
  actionButtonContainer: "flex gap-1",
  actionButton: (isActive?: boolean) =>
    cn(
      "cursor-pointer items-center hover:bg-accent-foreground/10 rounded-md p-2 transition-colors duration-100 bg-transparent text-muted-foreground hover:text-accent-foreground [&_svg]:size-4",
      isActive ? "bg-accent text-accent-foreground" : "",
    ),
};
type Props = {
  setTextFormatter: React.Dispatch<React.SetStateAction<boolean>>;
  triggerPickerRef: React.RefObject<HTMLButtonElement | null>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  isTextFormatter?: boolean;
  setShowStickerPicker: React.Dispatch<React.SetStateAction<boolean>>;
  showMarkDown: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showStickerPicker?: boolean;
  showPicker?: boolean;
};

export const InputActions = ({
  setTextFormatter,
  triggerPickerRef,
  setShowPicker,
  isPending,
  isTextFormatter,
  showMarkDown,
  onChange,
  setShowStickerPicker,
  showStickerPicker,
  showPicker,
}: Props) => {
  return (
    <div className={Style.container}>
      <Button
        type="button"
        className={cn(Style.actionButton(isTextFormatter))}
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
        <UploadImg
          onChange={onChange}
          className={cn(Style.actionButton(showMarkDown))}
          disabled={showMarkDown}
        />

        <Button
          ref={triggerPickerRef}
          disabled={showMarkDown}
          type="button"
          onClick={() => {
            setShowStickerPicker(false);
            setShowPicker?.((prev) => !prev);
          }}
          className={Style.actionButton(showPicker)}
        >
          <Smile size={20} />
        </Button>

        <Button
          type="button"
          disabled={showMarkDown}
          onClick={() => {
            setShowPicker(false);
            setShowStickerPicker?.((prev) => !prev);
          }}
          className={Style.actionButton(showStickerPicker)}
        >
          <Sticker size={20} />
        </Button>

        <Button disabled={showMarkDown || isPending} type="submit">
          <SendHorizontal size={20} />
        </Button>
      </div>
    </div>
  );
};
