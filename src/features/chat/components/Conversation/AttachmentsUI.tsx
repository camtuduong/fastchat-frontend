import type { Attachment } from "@/features/chat/types/Message";

export const AttachmentsUI = ({
  attachments,
}: {
  attachments: Attachment[];
}) => {
  return (
    <>
      {attachments.map((attachment, index) =>
        attachment.type === "image" ? (
          <div key={index} className="w-32">
            <img
              src={attachment.url}
              alt={`Attachment ${index + 1}`}
              className="h-auto w-full rounded-md object-cover"
            />
          </div>
        ) : (
          attachment.type === "video" && (
            <div key={index} className="w-32">
              <video
                autoPlay
                loop
                muted
                playsInline
                src={attachment.url}
                className="h-auto w-full rounded-md object-cover"
              />
            </div>
          )
        ),
      )}
    </>
  );
};
