import { useDropzone } from "react-dropzone";
import { useAttachmentStore } from "@/stores/useAttachmentStore";

export const DropZone = ({ children }: { children: React.ReactNode }) => {
  const addImages = useAttachmentStore((s) => s.addImages);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: addImages,
    accept: { "image/*": [] },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      {children}
      {isDragActive && (
        <div className="pointer-events-none absolute inset-0 z-50 bg-black/30" />
      )}
    </div>
  );
};
