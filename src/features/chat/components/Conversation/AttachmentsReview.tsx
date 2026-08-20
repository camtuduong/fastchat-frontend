import { Spinner } from "@/components/ui/spinner";
import type { PendingPreview } from "@/features/chat/components/Conversation/ConversationInputChat";
import { ReviewImgUpload } from "@/features/chat/components/Conversation/ReviewImgUpload";
import { X } from "lucide-react";

type Props = {
  preview: PendingPreview;
  removeImage?: (id: string) => void;
  removeSticker?: (id: string) => void;
  isUploading?: boolean;
  isPending?: boolean;
};

const STYLE = {
  container: "flex flex-wrap gap-1 p-2",
  imgContainer: "relative p-1",
  spinnerOverlay:
    "bg-accent/85 absolute inset-1 z-10 rounded-2xl flex items-center justify-center",
  spinner: "size-4 animate-spin text-white",
  removeButton:
    "bg-button-x text-button-x-text hover:bg-destructive absolute top-3 right-2 cursor-pointer rounded-full p-1 transition-colors duration-100",
  sticker: "h-32 w-32 rounded-2xl object-cover shadow-md",
};

export const AttachmentsReview = ({
  preview,
  removeImage,
  removeSticker,
  isUploading,
  isPending,
}: Props) => {
  return (
    <div className={STYLE.container}>
      {preview?.type === "image" &&
        preview.data.map((file) => (
          <div key={file.id} className={STYLE.imgContainer}>
            {(isUploading || isPending) && (
              <div className={STYLE.spinnerOverlay}>
                <Spinner className={STYLE.spinner} />
              </div>
            )}

            <ReviewImgUpload imgUrl={file.url} />
            <button
              type="button"
              className={STYLE.removeButton}
              onClick={() => removeImage?.(file.id)}
            >
              <X size={16} />
            </button>
          </div>
        ))}

      {preview?.type === "sticker" && (
        <div className={STYLE.imgContainer}>
          <video
            autoPlay
            loop
            muted
            playsInline
            src={preview.data.url}
            className={STYLE.sticker}
          />
          <button
            type="button"
            className={STYLE.removeButton}
            onClick={() => removeSticker?.(preview.data.id)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
