import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Attachment } from "@/features/chat/types/Message";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STYLE = {
  dialogContentContainer:
    "z-inset !top-1/2 !left-1/2 !h-[calc(100vh-128px)] !w-[calc(100vw-256px)] !max-w-none -translate-x-1/2 -translate-y-1/2 rounded-xl border-0 p-0 bg-accent text-white",
  container: "flex h-full w-full items-center justify-center",
  img: "h-full w-full object-contain absolute",
  button:
    "bg-accent absolute top-1/2 -translate-y-1/2 rounded-full p-2 text-white cursor-pointer hover:bg-accent/80 transition-colors",
};

type Props = {
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
  attachments: Attachment[];
};

export const GalleryImg = ({ open, onOpenChange, attachments }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev === attachments.length - 1 ? 0 : prev + 1));
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev === 0 ? attachments.length - 1 : prev - 1));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={STYLE.dialogContentContainer}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            previous();
          }

          if (e.key === "ArrowRight") {
            next();
          }
        }}
      >
        <div className={STYLE.container}>
          {attachments.length > 0 && (
            <img
              key={attachments[currentIndex].id}
              src={attachments[currentIndex].url}
              alt={attachments[currentIndex].name}
              className={STYLE.img}
              style={{ zIndex: 10 - currentIndex }}
            />
          )}
        </div>
        {attachments.length > 1 && (
          <>
            <button className={cn(STYLE.button, "-left-15")} onClick={previous}>
              <ChevronLeft />
            </button>
            <button className={cn(STYLE.button, "-right-15")} onClick={next}>
              <ChevronRight />
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
