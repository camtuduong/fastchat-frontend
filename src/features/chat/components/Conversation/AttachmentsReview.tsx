import type { PendingPreview } from "@/features/chat/components/Conversation/ConversationInputChat";
import { ReviewImgUpload } from "@/features/chat/components/Conversation/ReviewImgUpload";
import { X } from "lucide-react";

type Props = {
  preview: PendingPreview;
  removeImage?: (id: string) => void;
  removeSticker?: (id: string) => void;
};

export const AttachmentsReview = ({
  preview,
  removeImage,
  removeSticker,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-1 p-2">
      {preview?.type === "image" &&
        preview.data.map((file) => (
          <div key={file.id} className="relative p-1">
            <ReviewImgUpload imgUrl={file.url} />
            <button
              type="button"
              className="bg-accent-foreground hover:bg-destructive absolute top-3 right-2 cursor-pointer rounded-full p-1 text-white transition-colors duration-100"
              onClick={() => removeImage?.(file.id)}
            >
              <X size={16} />
            </button>
          </div>
        ))}

      {preview?.type === "sticker" && (
        <div className="relative p-1">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={preview.data.url}
            className="h-32 w-32 rounded-2xl object-cover shadow-md"
          />
          <button
            type="button"
            className="bg-accent-foreground hover:bg-destructive absolute top-3 right-2 cursor-pointer rounded-full p-1 text-white transition-colors duration-100"
            onClick={() => removeSticker?.(preview.data.id)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
