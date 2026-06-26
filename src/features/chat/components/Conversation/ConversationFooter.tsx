import Button from "@/components/base/Button";
import { CustomTextArea } from "@/features/chat/components/TextAreaCustom";

export const ConversationFooter = () => {
  return (
    <form className="absolute right-0 bottom-0 left-0 flex items-end gap-2 px-4 py-2">
      <div className="min-w-0 flex-1">
        <CustomTextArea className="bg-white" />
      </div>
      <div className="flex shrink-0 gap-2">
        <Button>Send</Button>
      </div>
    </form>
  );
};
