import type {
  ComposerAttachment,
  PreviewImage,
  StickerSelected,
} from "@/features/chat/types/sticker";
import { create } from "zustand/react";

type AttachmentStore = {
  attachment: ComposerAttachment | null;
  pendingAttachment: ComposerAttachment | null;
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  selectSticker: (sticker: StickerSelected) => void;
  confirmReplace: () => void;
  cancelReplace: () => void;
  clearAttachments: () => void;
};

const releaseImages = (attachment: ComposerAttachment | null) => {
  if (attachment?.type === "image") {
    attachment.data.forEach((image) => URL.revokeObjectURL(image.url));
  }
};

const withoutImage = (attachment: ComposerAttachment | null, id: string) => {
  if (attachment?.type !== "image") return attachment;
  const target = attachment.data.find((image) => image.id === id);
  if (!target) return attachment;
  URL.revokeObjectURL(target.url);
  const data = attachment.data.filter((image) => image.id !== id);
  return data.length ? { type: "image" as const, data } : null;
};

export const useAttachmentStore = create<AttachmentStore>((set) => ({
  attachment: null,
  pendingAttachment: null,

  addImages: (files) =>
    set((state) => {
      if (!files.length) return state;
      const added: PreviewImage[] = files.map((file) => ({
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
      }));
      const key =
        state.attachment?.type === "sticker"
          ? "pendingAttachment"
          : "attachment";
      const current = state[key];
      const data =
        current?.type === "image" ? [...current.data, ...added] : added;
      if (key === "attachment") {
        releaseImages(state.pendingAttachment);
        return { attachment: { type: "image", data }, pendingAttachment: null };
      }
      return { pendingAttachment: { type: "image", data } };
    }),

  removeImage: (id) =>
    set((state) => ({
      attachment: withoutImage(state.attachment, id),
      pendingAttachment: withoutImage(state.pendingAttachment, id),
    })),

  selectSticker: (sticker) =>
    set((state) => {
      releaseImages(state.pendingAttachment);
      const next: ComposerAttachment = { type: "sticker", data: sticker };
      if (!state.attachment)
        return { attachment: next, pendingAttachment: null };
      if (
        state.attachment.type === "sticker" &&
        state.attachment.data.id === sticker.id
      ) {
        return { pendingAttachment: null };
      }
      return { pendingAttachment: next };
    }),

  confirmReplace: () =>
    set((state) => {
      if (!state.pendingAttachment) return state;
      releaseImages(state.attachment);
      return { attachment: state.pendingAttachment, pendingAttachment: null };
    }),

  cancelReplace: () =>
    set((state) => {
      releaseImages(state.pendingAttachment);
      return { pendingAttachment: null };
    }),

  clearAttachments: () =>
    set((state) => {
      releaseImages(state.attachment);
      releaseImages(state.pendingAttachment);
      return { attachment: null, pendingAttachment: null };
    }),
}));
