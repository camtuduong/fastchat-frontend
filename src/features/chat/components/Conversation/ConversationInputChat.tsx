import { useEffect, useRef, useState } from "react";
import { CustomTextArea } from "@/features/chat/components/TextAreaCustom";
import { useSendMessageDirect } from "@/features/chat/hooks/useSendMessageDirect";
import { useSendMessageGroup } from "@/features/chat/hooks/useSendMessageGroup";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type { Emoji } from "@/features/chat/types/Message";
import { SendHorizontal } from "lucide-react";

type Props = {
  conversationId: string;
  conversationType?: "direct" | "group";
};

export const ConversationInputChat = ({
  conversationId,
  conversationType,
}: Props) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const isSendingRef = useRef(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const triggerPickerRef = useRef<HTMLButtonElement | null>(null);
  const { mutate: sendMessageDirect, isPending } = useSendMessageDirect();
  const { mutate: sendMessageGroup } = useSendMessageGroup(); // Placeholder for group message sending

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

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
    <form
      className="absolute right-0 bottom-1 left-0 flex items-end gap-2 px-4 py-2"
      onSubmit={handleSubmit}
    >
      {/* <div className="flex shrink-0 gap-2 self-center">
        <button type="submit" className="cursor-pointer" disabled={isPending}>
          <CirclePlus className="size-5" />
        </button>
        <button type="submit" className="cursor-pointer" disabled={isPending}>
          <FileImage className="size-5" />
        </button>
        <button type="submit" className="cursor-pointer" disabled={isPending}>
          <Sticker className="size-5" />
        </button>
        <button type="submit" className="cursor-pointer" disabled={isPending}>
          <ImagePlay className="size-5" />
        </button>
      </div> */}
      <div className="min-w-0 flex-1">
        <CustomTextArea
          className="bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Aa"
          setShowPicker={setShowPicker}
          triggerPickerRef={triggerPickerRef}
          inputRef={inputRef}
        />
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
      </div>
      <div className="flex shrink-0 gap-2 self-center">
        <button type="submit" className="cursor-pointer" disabled={isPending}>
          <SendHorizontal className="size-5" />
        </button>
      </div>
    </form>
  );
};
