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
import { Spinner } from "@/components/ui/spinner";
import type { JSONContent } from "@tiptap/react";
import type { ComposerAttachment } from "@/features/chat/types/sticker";

const Style = {
  container: "flex items-center gap-1",
  actionButtonContainer: "flex gap-1",
  actionButton: (isActive?: boolean) =>
    cn(
      "cursor-pointer items-center hover:bg-composer-action-hover rounded-md bg-transparent p-2 text-composer-icon transition-colors duration-100 hover:text-composer-icon-hover [&_svg]:size-4",
      isActive ? "bg-composer-action-hover text-composer-icon-hover" : "",
    ),
};
type Props = {
  setTextFormatter: React.Dispatch<React.SetStateAction<boolean>>;
  triggerPickerRef: React.RefObject<HTMLButtonElement | null>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  isTextFormatter?: boolean;
  setShowStickerPicker: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showStickerPicker?: boolean;
  showPicker?: boolean;
  isUploading?: boolean;
  content: JSONContent | null;
  attachment?: ComposerAttachment | null;
};

export const InputActions = ({
  setTextFormatter,
  triggerPickerRef,
  setShowPicker,
  isPending,
  isTextFormatter,
  onChange,
  setShowStickerPicker,
  showStickerPicker,
  showPicker,
  isUploading,
  content,
  attachment,
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
        <UploadImg onChange={onChange} className={cn(Style.actionButton())} />

        <Button
          ref={triggerPickerRef}
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
          onClick={() => {
            setShowPicker(false);
            setShowStickerPicker?.((prev) => !prev);
          }}
          className={Style.actionButton(showStickerPicker)}
        >
          <Sticker size={20} />
        </Button>

        <Button
          disabled={isPending || isUploading || (!content && !attachment)}
          type="submit"
          className="bg-composer-send text-composer-send-foreground hover:bg-composer-send-hover"
        >
          {isPending || isUploading ? (
            <Spinner className="size-4" />
          ) : (
            <SendHorizontal size={20} />
          )}
        </Button>
      </div>
    </div>
  );
};
