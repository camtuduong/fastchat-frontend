import { useSendMessageGroup } from "@/features/chat/hooks/useSendMessageGroup";
import { useEffect, useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { FormatterActions } from "@/features/chat/components/Conversation/FormatterActions";
import { InputActions } from "@/features/chat/components/Conversation/InputActions";
import { StickerPicker } from "@/features/chat/components/StickerPicker";
import { useSendMessageDirect } from "@/features/chat/hooks/useSendMessageDirect";
import type { Attachment, Emoji } from "@/features/chat/types/Message";
import { cn } from "@/lib/utils";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Eye, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type {
  PreviewImage,
  StickerData,
  StickerSelected,
} from "@/features/chat/types/sticker";
import { AlertDialog } from "@/features/chat/components/AlertDialog";
import { AttachmentsReview } from "@/features/chat/components/Conversation/AttachmentsReview";
import { useMessageStore } from "@/stores/useMessage";
import { ReplyMessage } from "@/features/chat/components/Conversation/ReplyMessage";

const Style = {
  container: "relative mb-3 flex items-end gap-2 px-4 py-2",
  textPending: "text-muted-foreground absolute -top-5 right-10 text-sm italic",
  actionButtonContainer: "flex min-w-0 flex-1 rounded-2xl border-2",
  actionButton:
    "cursor-pointer items-center hover:bg-accent-foreground/10 rounded-md p-2 transition-colors duration-100 bg-transparent text-muted-foreground hover:text-accent-foreground [&_svg]:size-4",
  inputContainer: "relative flex min-w-0 flex-1",
  input: "max-h-48 min-h-14 resize-none border-none py-4 text-base leading-6",
  eyeIcon:
    "text-muted-foreground hover:text-accent-foreground hover:bg-accent absolute top-1 right-2.5 cursor-pointer rounded-lg p-2 transition-colors duration-100",
  formatterContainer: "relative flex min-w-0 flex-1",
};

export type PendingPreview =
  | {
      type: "sticker";
      data: StickerSelected;
    }
  | {
      type: "image";
      data: PreviewImage[];
    };

type Props = {
  conversationId: string;
  conversationType?: "direct" | "group";
};

export const ConversationInputChat = ({
  conversationId,
  conversationType,
}: Props) => {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [textFormatter, setTextFormatter] = useState(false);
  const [showMarkDown, setShowMarkDown] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);

  const [preview, setPreview] = useState<PendingPreview | null>(null);
  const [pendingPreview, setPendingPreview] = useState<PendingPreview | null>(
    null,
  );

  //==> At any given time, only one image can be displayed: a sticker or images.
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  //state reply message store
  const { replyMessage, clearReplyMessage } = useMessageStore();

  const isSendingRef = useRef(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const triggerPickerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutateAsync: sendMessageDirect, isPending } = useSendMessageDirect();
  const { mutateAsync: sendMessageGroup } = useSendMessageGroup(); // Placeholder for group message sending

  const wrapSelection = (prefix: string, suffix = prefix) => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = message.slice(start, end);

    const next =
      message.slice(0, start) + prefix + selected + suffix + message.slice(end);

    setMessage(next);

    // Đợi React render xong rồi mới đặt lại con trỏ
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    });
  };

  const handleSendMessage = async () => {
    const content = message.trim();
    let attachments: Attachment[] = [];
    const replyTo = replyMessage?._id;

    if ((content === "" && !preview) || isPending || isSendingRef.current) {
      return;
    }

    if (preview) {
      if (preview?.type === "image" && preview.data.length > 0) {
        attachments = preview.data.map((file) => ({
          id: file.id,
          type: "image" as const,
          url: file.url,
          name: file?.file?.name,
        }));
      }

      if (preview?.type === "sticker") {
        attachments = [
          {
            id: preview.data.id,
            type: "video" as const,
            url: preview.data.url,
            name: preview.data.title,
          },
        ];
      }
    }

    isSendingRef.current = true;

    if (conversationType === "direct") {
      if (attachments.length > 0) {
        await sendMessageDirect(
          {
            conversationId: conversationId,
            attachments,
            replyTo,
          },
          {
            onSettled: () => {
              isSendingRef.current = false;
            },
          },
        );
      }
      if (content) {
        await sendMessageDirect(
          {
            conversationId: conversationId,
            content,
            replyTo,
          },
          {
            onSettled: () => {
              isSendingRef.current = false;
            },
          },
        );
      }

      setPreview(null); // Clear the preview after sending
      setMessage("");
      clearReplyMessage(); // Clear the reply message after sending

      return;
    }

    if (attachments.length > 0) {
      await sendMessageGroup(
        {
          conversationId: conversationId,
          content: "",
          attachments,
          replyTo,
        },
        {
          onSettled: () => {
            isSendingRef.current = false;
          },
        },
      );
    }
    if (content) {
      await sendMessageGroup(
        {
          conversationId: conversationId,
          content,
          replyTo,
        },
        {
          onSettled: () => {
            isSendingRef.current = false;
          },
        },
      );
    }

    setPreview(null); // Clear the preview after sending
    setMessage(""); // Clear the input after sending
    clearReplyMessage(); // Clear the reply message after sending
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Ignore the browser's repeated keydown events while Enter is held.
      if (e.repeat) {
        return;
      }

      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage();
  };

  const requestChangePreview = (nextPreview: PendingPreview) => {
    if (!preview) {
      setPreview(nextPreview);
      return;
    }

    setPendingPreview(nextPreview);
    if (nextPreview.type === "image" && preview.type === "image") {
      if (!pendingPreview) return;

      setPreview(pendingPreview);
      setPendingPreview(null);

      return;
    }

    if (nextPreview.type === "sticker" && preview.type === "sticker") {
      if (nextPreview.data.id === preview.data.id) {
        setPendingPreview(null);
        setShowStickerPicker(false);
        return;
      }
    }
    setOpenAlertDialog(true);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);

    requestChangePreview({
      type: "image",
      data: [
        ...(preview?.type === "image" ? preview.data : []),
        ...files.map((file) => ({
          id: crypto.randomUUID(),
          file,
          url: URL.createObjectURL(file),
        })),
      ],
    });

    input.value = "";
  };

  const removeImage = (id: string) => {
    setPreview((prev) => {
      if (prev?.type !== "image") return prev;

      const imageToRemove = prev.data.find((img) => img.id === id);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      const nextImages = prev.data.filter((img) => img.id !== id);

      if (nextImages.length === 0) {
        return null;
      }

      return {
        type: "image",
        data: nextImages,
      };
    });
  };

  const handleStickerClick = (sticker: StickerData, imageUrl: string) => {
    if (!imageUrl) return;

    requestChangePreview({
      type: "sticker",
      data: {
        id: sticker.id.toString(),
        url: imageUrl,
        title: sticker.title,
      },
    });
  };

  const removeSticker = (id: string) => {
    if (preview?.type === "sticker" && preview.data.id === id) {
      setPreview(null);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpenAlertDialog(nextOpen);

    if (!nextOpen) {
      setOpenAlertDialog(false);
    }
  };

  const handleConfirmReplacePreview = () => {
    if (!pendingPreview) return;

    setPreview(pendingPreview);
    setPendingPreview(null);
    setOpenAlertDialog(false);
  };

  useEffect(() => {
    if (!showPicker && !showStickerPicker) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      const clickedInsidePicker = pickerRef.current?.contains(target);
      const clickedTriggerButton = triggerPickerRef.current?.contains(target);

      if (!clickedInsidePicker && !clickedTriggerButton) {
        setShowPicker(false);
        setShowStickerPicker(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [showPicker, showStickerPicker]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [
    conversationId,
    replyMessage,
    showPicker,
    showStickerPicker,
    textFormatter,
    preview,
  ]);

  return (
    <form className={Style.container} onSubmit={handleSubmit}>
      {isPending && <div className={Style.textPending}>sending...</div>}

      <div
        className={cn(
          Style.actionButtonContainer,
          isExpanded || textFormatter || preview || replyMessage
            ? "flex-col"
            : "flex-row",
        )}
      >
        {/* reply message review */}
        {replyMessage && (
          <>
            <ReplyMessage
              avatarUrl={replyMessage.sender.avatarUrl}
              displayName={replyMessage.sender.displayName}
              content={replyMessage.content}
              className="bg-accent/10 dark:bg-accent m-2 rounded-lg p-2"
              description={<span className="shrink-0">Replying to:</span>}
            />
            <button
              type="button"
              className="bg-accent-foreground hover:bg-destructive absolute top-6 right-8 cursor-pointer rounded-full p-1 text-white transition-colors duration-100"
              onClick={() => clearReplyMessage()}
            >
              <X size={12} />
            </button>
          </>
        )}

        {/*  preview img or sticker   */}
        {preview && (
          <AttachmentsReview
            preview={preview}
            removeImage={removeImage}
            removeSticker={removeSticker}
          />
        )}

        {/* input content message  */}
        <div className={Style.inputContainer}>
          {!showMarkDown ? (
            <Textarea
              value={message}
              ref={inputRef}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              onInput={(e) => {
                const scrollHeight = e.currentTarget.scrollHeight;
                setIsExpanded((prev) => {
                  if (!prev && scrollHeight > 90) return true; // expand khi vượt 90px
                  if (prev && scrollHeight <= 63) return false; // collapse khi về 1 dòng
                  return prev;
                });
              }}
              className={cn(Style.input, textFormatter ? "pr-10" : "")}
            />
          ) : (
            <div className={cn(Style.input, "markdown-other p-4 text-sm")}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message}
              </ReactMarkdown>
            </div>
          )}
          {/* nút xem formatted message */}
          {textFormatter && (
            <button
              type="button"
              className={cn(
                Style.eyeIcon,
                showMarkDown ? "bg-accent text-accent-foreground" : "",
              )}
              onClick={() => setShowMarkDown((prev) => !prev)}
            >
              <Eye
                className={cn(showMarkDown ? "text-destructive" : "")}
                size={20}
              />
            </button>
          )}
        </div>

        {/* button actions */}
        <div
          className={cn(
            "text-muted-foreground flex h-full gap-1 p-3",
            textFormatter ? "justify-between" : "justify-end self-end",
          )}
        >
          {textFormatter && (
            <FormatterActions
              showMarkDown={showMarkDown}
              wrapSelection={wrapSelection}
            />
          )}
          <InputActions
            setTextFormatter={setTextFormatter}
            triggerPickerRef={triggerPickerRef}
            showMarkDown={showMarkDown}
            setShowPicker={setShowPicker}
            setShowStickerPicker={setShowStickerPicker}
            isPending={isPending}
            isTextFormatter={textFormatter}
            showStickerPicker={showStickerPicker}
            showPicker={showPicker}
            onChange={handleImgChange}
          />
        </div>
      </div>
      {showPicker && (
        <div ref={pickerRef} className="absolute right-20 bottom-15 z-10">
          <Picker
            data={data}
            onEmojiSelect={(emoji: Emoji) =>
              setMessage((prev) => prev + emoji.native)
            }
          />
        </div>
      )}

      {showStickerPicker && (
        <StickerPicker
          pickerRef={pickerRef}
          onStickerClick={handleStickerClick}
        />
      )}

      <AlertDialog
        open={openAlertDialog}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirmReplacePreview}
        title="Do you want to replace the attachment?"
        description="Replacing the attachment cannot be undone."
      />
    </form>
  );
};
