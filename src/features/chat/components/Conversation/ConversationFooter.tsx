import Button from "@/components/base/Button";
import { CustomTextArea } from "@/features/chat/components/TextAreaCustom";
import { useSendMessageDirect } from "@/features/chat/hooks/useSendMessageDirect";
import { useState } from "react";

type Props = {
  conversationId: string;
};

export const ConversationFooter = ({ conversationId }: Props) => {
  const [message, setMessage] = useState("");
  const { mutate: sendMessageDirect, isPending } = useSendMessageDirect();

  const handleSendMessage = () => {
    sendMessageDirect({
      conversationId: conversationId,
      content: message,
      attachments: [],
    });
    setMessage(""); // Clear the input after sending
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the default behavior of adding a new line
      e.stopPropagation(); // Prevents the form's onSubmit from also firing
      handleSendMessage();
    }
  };

  return (
    <form
      className="absolute right-0 bottom-0 left-0 flex items-end gap-2 px-4 py-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
    >
      <div className="min-w-0 flex-1">
        <CustomTextArea
          className="bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
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
