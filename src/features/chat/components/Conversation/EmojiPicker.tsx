import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type { Editor } from "@tiptap/react";
import type { Emoji } from "@/features/chat/types/Message";
export const EmojiPicker = ({
  pickerRef,
  editorRef,
}: {
  pickerRef: React.RefObject<HTMLDivElement | null>;
  editorRef: React.RefObject<Editor | null>;
}) => {
  return (
    <div ref={pickerRef} className="absolute right-20 bottom-15 z-10">
      <Picker
        data={data}
        onEmojiSelect={(emoji: Emoji) =>
          editorRef.current?.chain().focus().insertContent(emoji.native).run()
        }
      />
    </div>
  );
};
