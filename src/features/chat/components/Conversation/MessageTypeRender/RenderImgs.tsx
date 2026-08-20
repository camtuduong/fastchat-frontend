import { GalleryImg } from "@/features/chat/components/GalleryImg";
import type { Attachment } from "@/features/chat/types/Message";
import { useState } from "react";

type Props = {
  attachments: Attachment[];
  date: string;
};

const STYLE = {
  container:
    "relative mt-10 flex h-42 w-42 cursor-pointer items-center justify-center",
  img: "absolute h-42 w-42 rounded-2xl border object-cover",
  imgSingle: "h-42 w-42 cursor-pointer rounded-md object-cover",
};

export const RenderImgs = ({ attachments, date }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };

  return (
    <>
      {attachments.length === 1 ? (
        <img
          title={date}
          src={attachments[0].url}
          alt={attachments[0].name}
          className={STYLE.imgSingle}
          onClick={() => setOpen(true)}
        />
      ) : (
        <div
          className={STYLE.container}
          title={date}
          onClick={() => setOpen(true)}
        >
          {attachments.slice(0, 3).map((attachment, idx) => {
            let isEvenIndex = idx % 2 === 0;
            return (
              <img
                key={attachment.id}
                src={attachment.url}
                className={STYLE.img}
                style={{
                  right: !isEvenIndex ? idx * 15 : undefined,
                  left: isEvenIndex && idx !== 0 ? idx * 5 : undefined,
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
