import { useSendMessageDirect } from "@/features/chat/hooks/useSendMessageDirect";
import { useSendMessageGroup } from "@/features/chat/hooks/useSendMessageGroup";
import { useEffect, useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { InputActions } from "@/features/chat/components/Conversation/InputActions";
import type { Emoji } from "@/features/chat/types/Message";
import { cn } from "@/lib/utils";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Eye } from "lucide-react";
import { FormatterActions } from "@/features/chat/components/Conversation/FormatterActions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  const isSendingRef = useRef(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const triggerPickerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: sendMessageDirect, isPending } = useSendMessageDirect();
  const { mutate: sendMessageGroup } = useSendMessageGroup(); // Placeholder for group message sending

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

  const handleSendMessage = () => {
    const content = message.trim();

    if (!content || isPending || isSendingRef.current) {
      return;
    }

    isSendingRef.current = true;
    if (conversationType === "direct") {
      sendMessageDirect(
        {
          conversationId: conversationId,
          content,
          attachments: [],
        },
        {
          onSettled: () => {
            isSendingRef.current = false;
          },
        },
      );
    } else if (conversationType === "group") {
      sendMessageGroup(
        {
          conversationId: conversationId,
          content,
          attachments: [],
        },
        {
          onSettled: () => {
            isSendingRef.current = false;
          },
        },
      );
    }
    setMessage(""); // Clear the input after sending
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

  useEffect(() => {
    if (!showPicker) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      const clickedInsidePicker = pickerRef.current?.contains(target);
      const clickedTriggerButton = triggerPickerRef.current?.contains(target);

      if (!clickedInsidePicker && !clickedTriggerButton) {
        setShowPicker(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [showPicker]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [conversationId]);
  return (
    <form className={Style.container} onSubmit={handleSubmit}>
      {isPending && <div className={Style.textPending}>sending...</div>}
      <div
        className={cn(
          Style.actionButtonContainer,
          isExpanded || textFormatter ? "flex-col" : "flex-row",
        )}
      >
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
            <div className={cn(Style.input, "markdown-other p-3")}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message}
              </ReactMarkdown>
            </div>
          )}
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

        <div
          className={cn(
            "text-muted-foreground flex h-full gap-1 p-3",
            textFormatter ? "justify-between" : "justify-end self-end",
          )}
        >
          {textFormatter && <FormatterActions wrapSelection={wrapSelection} />}
          <InputActions
            setTextFormatter={setTextFormatter}
            triggerPickerRef={triggerPickerRef}
            setShowPicker={setShowPicker}
            isPending={isPending}
            isTextFormatter={textFormatter}
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
    </form>
  );
};
