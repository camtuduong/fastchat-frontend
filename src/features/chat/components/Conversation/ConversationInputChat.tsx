import { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";

import { useTranslation } from "react-i18next";
import { FormatterActions } from "@/features/chat/components/Conversation/FormatterActions";
import { InputActions } from "@/features/chat/components/Conversation/InputActions";
import { useSendMessage } from "@/features/chat/hooks/useSendMessage";
import type { Attachment } from "@/features/chat/types/Message";
import { cn } from "@/lib/utils";

import { X } from "lucide-react";
import type {
  StickerData,
  ComposerAttachment,
} from "@/features/chat/types/sticker";
import { AlertDialog } from "@/features/chat/components/AlertDialog";
import { AttachmentsReview } from "@/features/chat/components/Conversation/AttachmentsReview";
import { useMessageStore } from "@/stores/useMessage";
import { ReplyMessage } from "@/features/chat/components/Conversation/ReplyMessage";
import { useUploadAttachments } from "@/features/chat/hooks/useUploadAttachments";
import type { ReactVirtualizer } from "@tanstack/react-virtual";
import { useSocketStore } from "@/stores/useSocketStore";
import { useAuthStore } from "@/stores/useAuthStore";
import type { MentionItem } from "@/features/chat/utils/Suggestion";
import { useTextingStore } from "@/stores/useTextingStore";
import { ChatInput } from "@/features/chat/components/Conversation/ChatInput";
import type { Editor, JSONContent } from "@tiptap/react";
import {
  getMentionInNode,
  getTextFromContent,
  trimEmptyParagraphs,
} from "@/features/chat/utils/getTextFromContent";
import { useConversationStore } from "@/stores/useConversationStore";
import { StickerPicker } from "@/features/chat/components/StickerPicker";
import { useAttachmentStore } from "@/stores/useAttachmentStore";

const Style = {
  container: "relative flex items-end gap-2 p-4 pt-2 pb-8",
  textPending:
    "animate-pulse text-muted-foreground text-sm italic flex justify-end mr-12",
  typing:
    "animate-pulse absolute bottom-2 left-4.5 text-muted-foreground text-sm italic",
  actionButtonContainer: "flex min-w-0 flex-1 rounded-2xl border-2",
  actionButton:
    "cursor-pointer items-center hover:bg-accent-foreground/10 rounded-md p-2 transition-colors duration-100 bg-transparent text-muted-foreground hover:text-accent-foreground [&_svg]:size-4",
  inputContainer: "relative flex min-w-0 flex-1",
  input:
    "max-h-48 min-h-14 resize-none border-none rounded-xl bg-transparent py-4 text-base leading-6",
  eyeIcon:
    "text-muted-foreground hover:text-accent-foreground hover:bg-accent/5 absolute top-1 right-2.5 cursor-pointer rounded-lg p-2 transition-colors duration-100",
  formatterContainer: "relative flex min-w-0 flex-1",
};

const EmojiPicker = lazy(() =>
  import("@/features/chat/components/Conversation/EmojiPicker").then(
    (module) => ({
      default: module.EmojiPicker,
    }),
  ),
);

type Props = {
  conversationId: string | undefined;
  virtualizer: ReactVirtualizer<HTMLDivElement, HTMLDivElement>;
  setHasNewMessage: React.Dispatch<React.SetStateAction<number>>;
};

export const ConversationInputChat = ({
  conversationId,
  virtualizer,
  setHasNewMessage,
}: Props) => {
  if (!conversationId) {
    return null;
  }
  const { t } = useTranslation();
  const [message, setMessage] = useState<JSONContent | null>(null);

  const editorRef = useRef<Editor | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [textFormatter, setTextFormatter] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);

  //==> At any given time, only one image can be displayed: a sticker or images.

  const isTypingRef = useRef(false);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSendingRef = useRef(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const triggerPickerRef = useRef<HTMLButtonElement | null>(null);

  const myUserId = useAuthStore((state) => state.userId);

  //socket
  const socket = useSocketStore((state) => state.socket);

  // Typing indicator state
  const userTexting = useTextingStore((state) => state.userTexting);
  const currentTypingUsers = useMemo(
    () => userTexting.filter((item) => item.conversationId === conversationId),
    [userTexting, conversationId],
  );

  const conversationDataDetail = useConversationStore(
    (state) => state.conversationDataDetail,
  );
  //state reply message store
  const replyMessage = useMessageStore((state) => state.replyMessage);
  const clearReplyMessage = useMessageStore((state) => state.clearReplyMessage);

  const addImages = useAttachmentStore((state) => state.addImages);
  const attachment = useAttachmentStore((state) => state.attachment);
  const pendingAttachment = useAttachmentStore(
    (state) => state.pendingAttachment,
  );
  const removeImage = useAttachmentStore((state) => state.removeImage);
  const selectSticker = useAttachmentStore((state) => state.selectSticker);
  const confirmReplace = useAttachmentStore((state) => state.confirmReplace);
  const cancelReplace = useAttachmentStore((state) => state.cancelReplace);
  const clearAttachments = useAttachmentStore(
    (state) => state.clearAttachments,
  );

  // Danh sách người có thể @mention: thành viên cuộc trò chuyện (trừ bản thân)
  const mentionItems = useMemo<MentionItem[]>(
    () =>
      (conversationDataDetail?.participants ?? [])
        .filter((member) => member.userId !== myUserId)
        .map((member) => ({
          id: member.userId,
          label: member.displayName,
          avatarUrl: member.avatarUrl,
        })),
    [conversationDataDetail?.participants, myUserId],
  );

  const { mutateAsync: sendMessage, isPending } = useSendMessage();
  const { mutateAsync: uploadAttachments, isPending: isUploading } =
    useUploadAttachments();

  const handleSendMessage = async () => {
    if (!message && !attachment) return;

    const content = getTextFromContent(message).trim();
    let attachments: Attachment[] = [];
    const replyTo = replyMessage?._id;

    if (isPending || isUploading || isSendingRef.current) {
      return;
    }

    if (attachment) {
      if (attachment?.type === "image" && attachment.data.length > 0) {
        const res = await handleUploadAttachment(attachment);
        if (res) {
          attachments = res.urls.map((url) => ({
            id: url,
            type: "image" as const,
            url: url,
            name: url.split("/").pop() || "image",
          }));
        }
      }

      if (attachment?.type === "sticker") {
        attachments = [
          {
            id: attachment.data.id,
            type: "sticker" as const,
            url: attachment.data.url,
            name: attachment.data.title,
          },
        ];
      }
    }

    isSendingRef.current = true;

    if (attachments.length > 0) {
      await sendMessage(
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

    if (content && message) {
      await sendMessage(
        {
          conversationId: conversationId,
          content,
          contentJson: trimEmptyParagraphs(message),
          replyTo,
          mentionedUserIds: [...getMentionInNode(trimEmptyParagraphs(message))],
        },
        {
          onSettled: () => {
            isSendingRef.current = false;
          },
        },
      );
    }

    clearAttachments();
    editorRef.current?.commands.clearContent();
    setMessage(null);
    setIsExpanded(false);
    clearReplyMessage(); // Clear the reply message after sending
    virtualizer.scrollToEnd(); // Scroll to the end after sending a message
    setHasNewMessage(0); // Reset the new message count after sending a message
  };
  const submitMessage = () => {
    stopTyping(conversationId);
    handleSendMessage();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };

  const handleTyping = () => {
    // Chỉ emit "typing" lần đầu, không emit mỗi ký tự
    if (!isTypingRef.current && socket) {
      isTypingRef.current = true;
      socket.emit("typing", { conversationId });
    }
    // Sau 2 giây không gõ nữa thì báo dừng
    if (stopTimerRef.current !== null) {
      clearTimeout(stopTimerRef.current);
    }
    stopTimerRef.current = setTimeout(() => stopTyping(conversationId), 2000);
  };

  const stopTyping = (conversationId: string) => {
    if (!isTypingRef.current || !socket) return;
    isTypingRef.current = false;
    if (stopTimerRef.current !== null) {
      clearTimeout(stopTimerRef.current);
    }
    socket?.emit("stopped-typing", { conversationId });
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);

    addImages(files);

    input.value = "";
  };

  const handleStickerClick = (sticker: StickerData, imageUrl: string) => {
    if (!imageUrl) return;

    if (
      attachment?.type === "sticker" &&
      attachment.data.id === sticker.id.toString()
    ) {
      setShowStickerPicker(false);
    }
    selectSticker({
      id: sticker.id.toString(),
      url: imageUrl,
      title: sticker.title,
    });
  };

  const removeSticker = (id: string) => {
    if (attachment?.type === "sticker" && attachment.data.id === id) {
      clearAttachments();
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) cancelReplace();
  };

  const handleUploadAttachment = async (attachment: ComposerAttachment) => {
    if (attachment.type === "image") {
      const files = attachment.data
        .map((file) => file.file)
        .filter(Boolean) as File[];
      const res = await uploadAttachments({
        conversationId,
        formData: files.reduce((formData, file) => {
          formData.append("files", file);
          return formData;
        }, new FormData()),
      });
      return res;
    }
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
    editorRef.current?.commands.focus();
  }, [
    conversationId,
    replyMessage,
    showPicker,
    showStickerPicker,
    textFormatter,
    attachment,
  ]);

  return (
    <div className="shrink-0">
      {(isPending || isUploading) && (
        <div className={Style.textPending}>{t("chat.sending")}</div>
      )}

      <form className={Style.container} onSubmit={handleSubmit}>
        {currentTypingUsers.length > 0 && (
          <div className={Style.typing}>
            {currentTypingUsers.map((user) => user.userDisplayName).join(", ")}{" "}
            {t("chat.typing", { count: currentTypingUsers.length })}
          </div>
        )}
        <div
          className={cn(
            Style.actionButtonContainer,
            isExpanded || textFormatter || attachment || replyMessage
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
                className="m-2 rounded-lg"
                description={<span className="shrink-0">Replying to:</span>}
                hasAttachment={(replyMessage.attachments?.length ?? 0) > 0}
                variant="composer"
              />
              <button
                type="button"
                className="hover:bg-reply-preview-dismiss-hover-bg text-reply-preview-dismiss hover:text-reply-preview-dismiss-hover absolute top-8 right-8 cursor-pointer rounded-full bg-transparent p-1 transition-colors duration-100"
                onClick={() => clearReplyMessage()}
              >
                <X size={12} />
              </button>
            </>
          )}

          {/*  attachment img or sticker   */}
          {attachment && (
            <AttachmentsReview
              attachment={attachment}
              removeImage={removeImage}
              removeSticker={removeSticker}
              isUploading={isUploading}
              isPending={isPending}
            />
          )}

          {/* input content message  */}
          <div className={Style.inputContainer}>
            <ChatInput
              message={message}
              setMessage={setMessage}
              onChange={handleTyping}
              onSubmit={submitMessage}
              placeholder={t("chat.inputPlaceholder")}
              mentionItems={mentionItems}
              editorRef={editorRef}
              onHeightChange={(scrollHeight) =>
                setIsExpanded((prev) => {
                  if (!prev && scrollHeight > 90) return true; // expand khi vượt 90px
                  if (prev && scrollHeight <= 63) return false; // collapse khi về 1 dòng
                  return prev;
                })
              }
              className={cn(Style.input, textFormatter ? "pr-10" : "")}
            />
          </div>

          {/* button actions */}
          <div
            className={cn(
              "text-muted-foreground flex h-full gap-1 p-3",
              textFormatter ? "justify-between" : "justify-end self-end",
            )}
          >
            {textFormatter && <FormatterActions editorRef={editorRef} />}
            <InputActions
              setTextFormatter={setTextFormatter}
              triggerPickerRef={triggerPickerRef}
              setShowPicker={setShowPicker}
              setShowStickerPicker={setShowStickerPicker}
              isPending={isPending}
              isTextFormatter={textFormatter}
              showStickerPicker={showStickerPicker}
              showPicker={showPicker}
              onChange={handleImgChange}
              isUploading={isUploading}
              content={message}
              attachment={attachment}
            />
          </div>
        </div>
        {showPicker && (
          <Suspense>
            <EmojiPicker pickerRef={pickerRef} editorRef={editorRef} />
          </Suspense>
        )}

        {showStickerPicker && (
          <StickerPicker
            pickerRef={pickerRef}
            onStickerClick={handleStickerClick}
          />
        )}

        <AlertDialog
          open={pendingAttachment !== null}
          onOpenChange={handleOpenChange}
          onConfirm={confirmReplace}
          title={t("chat.replaceAttachment.title")}
          description={t("chat.replaceAttachment.description")}
        />
      </form>
    </div>
  );
};
