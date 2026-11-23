import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAttachmentStore } from "./useAttachmentStore";

const store = () => useAttachmentStore.getState();
const images = () => {
  const file =
    store().pendingAttachment?.type === "image"
      ? store().pendingAttachment
      : store().attachment;
  if (file?.type !== "image") throw new Error("Expected image files");
  return file.data;
};
const image = (name: string) => new File([name], name, { type: "image/png" });
const sticker = {
  type: "sticker" as const,
  data: { id: "sticker", url: "sticker.webm", title: "Sticker" },
};

beforeEach(() => {
  useAttachmentStore.setState({
    attachment: null,
    pendingAttachment: null,
  });
  let id = 0;
  vi.spyOn(URL, "createObjectURL").mockImplementation(
    () => `blob:test-${++id}`,
  );
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
});
afterEach(() => {
  store().clearAttachments();
  vi.restoreAllMocks();
});

describe("attachment selection", () => {
  it("combines images added by drop and input into the visible attachment", () => {
    store().addImages([image("drop.png")]);
    store().addImages([image("input.png")]);
    expect(store().attachment?.type).toBe("image");
    expect(images()).toHaveLength(2);
    expect(store().pendingAttachment).toBeNull();
  });

  it("removes an image everywhere and never restores it when adding another", () => {
    store().addImages([image("first.png"), image("second.png")]);
    const removed = images()[0];
    store().removeImage(removed.id);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(removed.url);
    expect(store().attachment?.type).toBe("image");
    expect(images()).toHaveLength(1);
    store().addImages([image("third.png")]);
    expect(images().map((entry) => entry.id)).not.toContain(removed.id);
    expect(store().attachment?.type).toBe("image");
    for (const entry of [...images()]) store().removeImage(entry.id);
    expect(store().attachment).toBeNull();
  });

  it("requests confirmation when dropping onto a sticker and clears canceled images", () => {
    store().selectSticker(sticker.data);
    store().addImages([image("drop.png")]);
    expect(store().attachment).toEqual(sticker);
    expect(store().pendingAttachment?.type).toBe("image");
    store().cancelReplace();
    expect(store().attachment).toEqual(sticker);
    expect(store().pendingAttachment).toBeNull();
  });

  it("updates pending images when removing their last item", () => {
    store().selectSticker(sticker.data);
    store().addImages([image("pending.png")]);
    store().removeImage(images()[0].id);
    expect(store().attachment).toEqual(sticker);
    expect(store().pendingAttachment).toBeNull();
  });

  it("retains current images when a sticker replacement is canceled", () => {
    store().addImages([image("keep.png")]);
    store().selectSticker(sticker.data);
    store().cancelReplace();
    expect(store().attachment?.type).toBe("image");
    expect(images()).toHaveLength(1);
  });
  it("releases replaced image URLs when confirming a sticker", () => {
    store().addImages([image("old.png")]);
    const url = images()[0].url;
    store().selectSticker(sticker.data);
    store().confirmReplace();
    expect(store().attachment).toEqual(sticker);
    expect(store().pendingAttachment).toBeNull();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
  });

  it("accumulates pending drops and keeps their URLs alive after confirmation", () => {
    store().selectSticker(sticker.data);
    store().addImages([image("one.png")]);
    store().addImages([image("two.png")]);
    const pending = store().pendingAttachment;
    expect(images()).toHaveLength(2);
    store().confirmReplace();
    expect(store().attachment).toEqual(pending);
    expect(store().pendingAttachment).toBeNull();
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
  });

  it("releases pending image URLs when canceling replacement", () => {
    store().selectSticker(sticker.data);
    store().addImages([image("cancel.png")]);
    const url = images()[0].url;
    store().cancelReplace();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
    expect(store().attachment).toEqual(sticker);
    expect(store().pendingAttachment).toBeNull();
  });
});
