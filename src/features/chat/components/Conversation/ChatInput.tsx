import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Mention from "@tiptap/extension-mention";
import { splitBlock } from "@tiptap/pm/commands";
import { Placeholder, UndoRedo } from "@tiptap/extensions";
import { useEffect, useMemo, useRef } from "react";
import type { Editor, JSONContent } from "@tiptap/react";
import {
  createSuggestion,
  type MentionItem,
} from "@/features/chat/utils/Suggestion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  message: JSONContent | null;
  setMessage: React.Dispatch<React.SetStateAction<JSONContent | null>>;
  onChange?: (message: JSONContent | null) => void;
  onHeightChange?: (scrollHeight: number) => void;
  onSubmit?: () => void;
  placeholder?: string;
  mentionItems?: MentionItem[];
  editorRef?: React.RefObject<Editor | null>;
};

const STYLES = {
  input:
    "text-composer-foreground placeholder:text-composer-placeholder focus:border-composer-focus-border disabled:bg-field-disabled disabled:text-muted-foreground aria-invalid:border-field-invalid-border align-center flex field-sizing-content overflow-y-auto min-h-16 w-full min-w-0 resize-none rounded-lg border bg-transparent px-4 py-2 text-base transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
};

export const ChatInput = ({
  className,
  message: initialMessage,
  setMessage,
  onChange,
  onHeightChange,
  onSubmit,
  placeholder = "Type a message...",
  mentionItems = [],
  editorRef,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // useEditor chỉ giữ options lúc tạo, nên dùng ref để luôn gọi callback mới nhất
  const onSubmitRef = useRef(onSubmit);
  const onChangeRef = useRef(onChange);
  onSubmitRef.current = onSubmit;
  onChangeRef.current = onChange;
  const mentionItemsRef = useRef(mentionItems);
  mentionItemsRef.current = mentionItems;
  const isMentionOpenRef = useRef(false);
  const suggestion = useMemo(
    () =>
      createSuggestion(
        () => mentionItemsRef.current,
        (open) => {
          isMentionOpenRef.current = open;
        },
      ),
    [],
  );

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      UndoRedo,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: suggestion,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],

    content: initialMessage ?? "",

    editorProps: {
      attributes: {
        class: "w-full min-h-full outline-none",
      },
      handleKeyDown: (view, event) => {
        if (event.key !== "Enter" || event.isComposing) return false;
        // Popup mention đang hiện thì để nó xử lý Enter (chọn mention)
        if (isMentionOpenRef.current) return false;

        if (event.shiftKey) {
          return splitBlock(view.state, view.dispatch);
        }

        event.preventDefault();
        // Bỏ qua keydown lặp lại khi giữ phím Enter
        if (!event.repeat) onSubmitRef.current?.();
        return true;
      },
    },

    onUpdate: ({ editor }) => {
      const newMessage = editor.getJSON();
      setMessage(newMessage);
      onChangeRef.current?.(newMessage);
      if (containerRef.current) {
        onHeightChange?.(containerRef.current.scrollHeight);
      }
    },
  });

  useEffect(() => {
    if (editorRef) editorRef.current = editor;
    return () => {
      if (editorRef) editorRef.current = null;
    };
  }, [editor, editorRef]);

  return (
    <div
      ref={containerRef}
      data-chat-input
      className={cn("relative cursor-text", STYLES.input, className)}
      onClick={() => editor?.chain().focus().run()}
    >
      <EditorContent editor={editor} className="min-w-0 flex-1" />
    </div>
  );
};
