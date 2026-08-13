import { GalleryImg } from "@/features/chat/components/GalleryImg";
import type { Attachment } from "@/features/chat/types/Message";
import { useState } from "react";

type Props = {
  attachments: Attachment[];
};

export const RenderImgs = ({ attachments }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };
  return (
    <>
      {attachments.length === 1 ? (
        <img
          src={attachments[0].url}
          alt={attachments[0].name}
          className="h-42 w-42 cursor-pointer rounded-md object-cover"
          onClick={() => setOpen(true)}
        />
      ) : (
        <div
          className="relative my-12 flex h-42 w-42 cursor-pointer items-center justify-center"
          onClick={() => setOpen(true)}
        >
          {attachments.slice(0, 3).map((attachment, idx) => {
            let isEvenIndex = idx % 2 === 0;
            return (
              <img
                key={attachment.id}
                src={attachment.url}
                className="absolute rounded-2xl border object-cover"
                style={{
                  right: !isEvenIndex ? idx * 10 : undefined,
                  left: isEvenIndex && idx !== 0 ? idx * 10 : undefined,
                  bottom: idx * 20,
                  zIndex: 10 - idx,
                  transform:
                    idx === 0
                      ? undefined
                      : `rotate(${isEvenIndex ? 5 : -5}deg)`,
                }}
              />
            );
          })}
        </div>
      )}
      <GalleryImg
        open={open}
        onOpenChange={handleOpenChange}
        attachments={attachments}
      />
    </>
  );
};
