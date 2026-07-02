import { useRef, useState } from "react";
import Button from "@/components/base/Button";
import { CustomTextArea } from "@/features/chat/components/TextAreaCustom";
import { useSendMessageDirect } from "@/features/chat/hooks/useSendMessageDirect";
import { useSendMessageGroup } from "@/features/chat/hooks/useSendMessageGroup";

type Props = {
  conversationId: string;
  conversationType?: "direct" | "group";
};

export const ConversationFooter = ({
  conversationId,
  conversationType,
}: Props) => {
  const [message, setMessage] = useState("");
  const isSendingRef = useRef(false);
  const { mutate: sendMessageDirect, isPending } = useSendMessageDirect();
  const { mutate: sendMessageGroup } = useSendMessageGroup(); // Placeholder for group message sending

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

  return (
    <form
      className="absolute right-0 bottom-5 left-0 flex items-end gap-2 px-4 py-2"
      onSubmit={handleSubmit}
    >
      <div className="min-w-0 flex-1">
        <CustomTextArea
          className="bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Aa"
        />
      </div>
      <div className="flex shrink-0 gap-2">
        <Button type="submit" disabled={isPending}>
          Send
        </Button>
      </div>
    </form>
  );
};
